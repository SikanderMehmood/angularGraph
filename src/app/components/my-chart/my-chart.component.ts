import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import { Department } from 'src/models/Department';
import {DataServiceService} from '../../../services/data-service.service';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { DepartmentsComponent } from '../departments/departments.component';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {


  title = 'chartapp';
  selectedDay: number = 1;
  allDepartments: any[] = [];
  departData: any[] = [];
  departmentId: any = '';
  incomingData: any[] = [];
  outGoingData: any[] = [];
  years: any[] = [];
  barChatIncomingData : any[] = [];
  barChatOutgoingData : any[] = [];
  barYearData: any[] = [];
  maximumRange:number = 0;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  @ViewChild(DepartmentsComponent) child!: DepartmentsComponent;


  // myfunction(){
  //   this.child.myfunction(this.incomingData,this.outGoingData,this.years);
  // }

  public barChartOptions: any = {
    scales : {
      yAxes: [{
          ticks: {
          beginAtZero: true,
              stepValue: 10,
              steps: 20,
            max : 1000,
          }
      }]
    }
    
  };


  public barChartLabels: Label[]=[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.incomingData, label: '# of Incoming Registers' },
    { data: this.outGoingData, label: '# of Outgoing Registers' }
  ];




  constructor(private dataService: DataServiceService,private http:HttpClient,public datepipe: DatePipe) {



  }

  ngOnInit() {
    //--------------
    this.setChartsData();
    const url = 'http://127.0.0.1:8000/get/organizations/';
    this.http.get<any>(url).subscribe(
      res => {
        this.allDepartments = res['organization'];
        console.log(this.allDepartments);

      },
      error => {
        alert('some error occoured while getting departments');
      }
    );

    
  }




  
  createIncomingData(departData: any[]) {

    let index = 0;
    for (index; index < departData.length; ++index) {
      this.incomingData.push(departData[index]['Incomingcount']);
    }

    return this.incomingData;
  }

  createOutgoingData(departData: any[]) {

    let index = 0;
    for (index; index < departData.length; ++index) {
      this.outGoingData.push(departData[index]['outgoingCount']);
    }
    
    return this.outGoingData;
  }

  createYears(departData: any[]) {

    let index = 0;
    for (index; index < departData.length; ++index) {
      this.years.push(departData[index]['Label']);
    }

    return this.years;
  }

  getMaximumRangeNumber() {

    let outgoingNumber = Math.max(...this.outGoingData);
    let incomingNumber = Math.max(...this.incomingData);

    if (outgoingNumber < incomingNumber) {
      this.maximumRange = incomingNumber;
    }
    else{
      this.maximumRange = outgoingNumber;
    }

  }

  selectChangeHandler() {
    this.departData = [];
    this.incomingData = [];
    this.outGoingData = [];
    this.barChatIncomingData = [];
    this.barChatOutgoingData = [];
    this.years = [];
    let startDate =this.datepipe.transform(this.range.value['start'], 'yyyy-MM-dd');
    let endDate =this.datepipe.transform(this.range.value['end'], 'yyyy-MM-dd');
    let url = 'http://127.0.0.1:8000/get/dairy/inout/' + this.departmentId + '/' + startDate + '/' + endDate;
    this.http.get<any>(url).subscribe(
      res => {
        if(res['organizationInOutListCount']!= null){
         this.departData = res['organizationInOutListCount'];
        console.log(this.departData);
        this.incomingData = this.createIncomingData(this.departData);
        this.outGoingData = this.createOutgoingData(this.departData);
        this.getMaximumRangeNumber();
        this.years = this.createYears(this.departData);
        this.barChatIncomingData = this.incomingData;
        this.barChatOutgoingData = this.outGoingData;
        this.barYearData  = this.years;
        //this.myfunction();
        this.barChartLabels=this.years;
        this.setChartsData();
        }
        else{
          this.incomingData = [];
          this.outGoingData = [];
          this.setChartsData();

          alert("No Register exists in selected Time Period for the organization.")

        }
      },
      error => {
        // alert('some error occoured while getting departments');
      }
    );



  }




  setChartsData(){

    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.years,
        datasets: [{
          label: '# of Incoming Registers',
          data: this.incomingData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)'
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max : this.maximumRange,
            }
          }]
        }
      }
    });

    var myChart = new Chart("myChart2", {
      type: 'bar',
      data: {
        labels:this.years,
        datasets: [{
          label: '# of Outgoing Registers',
          data: this.outGoingData,
          backgroundColor: [
            'lightblue',
            'lightblue',
            'lightblue',
            'lightblue',
            'lightblue',
            'lightblue'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max : this.maximumRange,
            }
          }]
        }
      }
    });

  }


}
