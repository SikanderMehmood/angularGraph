import {Component, OnInit} from '@angular/core';
import {DataServiceService} from '../services/data-service.service';
import {ElementRef} from '@angular/core';
import {DataItem, Service} from '../services/dataitem.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chartapp';
  selectedDay: number = 1;
  allDepartments: any[] = [];
  departData: any[] = [];
  allDepartmentsasd: any = '';
  departmentId: any = '';
  dataSource: DataItem[];
  dataSource2: DataItem[];
  colors: string[];
  service: Service;
  isFirstLevel: boolean;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  incomingData: any[] = [];
  outGoingData: any[] = [];
  years: any[] = [];
  barChatIncomingData: any[] = [];
  barChatOutgoingData: any[] = [];
  barYearData: any[] = [];
  maximumRange: number = 0;
  // disableClick: any = true;

  constructor(private dataService: DataServiceService, service: Service, element: ElementRef, private http: HttpClient, public datepipe: DatePipe) {
    this.dataSource = [];
    this.dataSource2 = [];
    this.colors = service.getColors();
    this.service = service;
    this.isFirstLevel = true;
  }

  arrsdas: any = [
    {key: 1, value: 'PITB'},
    {key: 2, value: 'Financial Department'},
    {key: 3, value: 'Police Department'},
    {key: 4, value: 'Developement'},
  ];

  // second: any = [
  //   {Label: '10', Incomingcount: 11, outgoingCount: 9},
  //   {Label: '11', Incomingcount: 12, outgoingCount: 12},
  //   {Label: '12', Incomingcount: 13, outgoingCount: 13},
  //   {Label: '13', Incomingcount: 14, outgoingCount: 14},
  // ];

  ngOnInit() {
    const url = 'http://127.0.0.1:8000/get/organizations/';
    this.http.get<any>(url).subscribe(
      res => {
        this.allDepartments = res['organization'];
       // console.log(this.allDepartments);
      },
      error => {
        this.allDepartments = this.arrsdas;
        // alert('some error occoured while getting departments');
      }
    );
  }


  onButtonClick() {
    if (!this.isFirstLevel) {
      this.isFirstLevel = true;
    }
  }

  createIncomingData(departData: any[]) {
    this.incomingData = []
    let index = 0;
    for (index; index < departData.length; ++index) {
      this.incomingData.push(departData[index]['Incomingcount']);
    }

    return this.incomingData;
  }

  createOutgoingData(departData: any[]) {
    this.outGoingData = []
    let index = 0;
    for (index; index < departData.length; ++index) {
      this.outGoingData.push(departData[index]['outgoingCount']);
    }
  }

  onPointClick(e: any) {
    if (this.getDisableClickValue()) {
      if (this.isFirstLevel) {
        this.isFirstLevel = false;
        this.dataSource = [];
        this.dataSource2 = [];
        this.getoneYearDataIncomingForOneDepartment(e.target.originalArgument, this.departmentId);
       // this.getoneYearDataOutgoingForOneDepartment(e.target.originalArgument, this.departmentId);
      }
    }
    else {
      alert('No more data exist');
    }
  }

  customizePoint = () => {
    let pointSettings: any;

    pointSettings = {
      color: this.colors[Number(this.isFirstLevel)]
    };

    if (!this.isFirstLevel) {
      pointSettings.hoverStyle = {
        hatching: 'none'
      };
    }

    return pointSettings;
  }


  createYears(departData: any[]) {

    let index = 0;
    for (index; index < departData.length; ++index) {
      this.years.push(departData[index]['Label']);
    }

    return this.years;
  }

  selectChangeHandler() {
    this.dataSource = [];
    this.dataSource2 = [];
    let startDate = this.datepipe.transform(this.range.value['start'], 'yyyy-MM-dd');
    let endDate = this.datepipe.transform(this.range.value['end'], 'yyyy-MM-dd');
    this.colors = this.service.getColors();
    this.getAllIncomingData(this.departmentId, startDate, endDate);
    //this.getAllOutGoingData(this.departmentId, startDate, endDate);
     
  }

  //  incomingData//: DataItem[] = [];
  
  // outgoingData: DataItem[] = [];

  second:any= [];
  third = [];

  disableClick: any = true;

  getDisableClickValue(): boolean {
    return this.disableClick;
  }

  myarray: any[] = [];


  getYearsOutgoingData(): any {
    this.dataSource2 = []
    this.second.forEach((obj, index) => {
      this.dataSource2.push({'arg': obj['Label'], 'val': obj['outgoingCount'], 'parentID': ''});
    });
  }

  getYearsIncomingData(): any {
    this.dataSource = [];
    this.second.forEach((obj, index) => {
      this.dataSource.push({'arg': obj['Label'], 'val': obj['Incomingcount'], 'parentID': ''});
    });
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

  // getMonthsIncomingData(): DataItem[] {
  //
  // }
  //
  // getMonthsOutGoingData(): DataItem[] {
  //
  // }

  getAllIncomingData(departmentId,startDate,endDate) {
    const url  = 'http://127.0.0.1:8000/get/dairy/inout/' + departmentId + '/' + startDate + '/' + endDate;
    this.http.get<any>(url).subscribe(
      res => {
        this.second = [];
        if(res['organizationInOutListCount']!= null){
        this.second = res['organizationInOutListCount'];
        this.createIncomingData(this.second);
        this.createOutgoingData(this.second);
        this.getYearsIncomingData();
        this.getYearsOutgoingData();
        this.getMaximumRangeNumber();
        if (this.dataSource[0].arg.indexOf('0')==-1) {
          this.disableClick = false;
        }
      }    else{
        alert("No Register exists in selected Time Period for the organization.")
      }

      },
      error => {
        alert('some error while getting years data');
      }
    );
  }

  // getAllOutGoingData(departmentId,startDate,endDate){
  //   const url  = 'http://127.0.0.1:8000/get/dairy/inout/' + departmentId + '/' + startDate + '/' + endDate;
  //   this.http.get<any>(url).subscribe(
  //     res => {
  //       this.third = [];
  //       if(res['organizationInOutListCount']!= null){
  //       this.third = res['organizationInOutListCount'];
        
        
        
        
  //       }
  //       else{
  //         alert("No Register exists in selected Time Period for the organization.")
  //       }

  //     },
  //     error => {
  //       alert('some error while getting years data');
  //      // this.getYearsOutgoingData();
  //     }
  //   );
  // }

  getoneYearDataIncomingForOneDepartment( year: any,departmentId: any) {
    const url = 'http://127.0.0.1:8000/get/dairy/months/inout/' + departmentId + '/' + year;
    this.http.get<any>(url).subscribe(
      res => {
        this.second = [];
        if(res['organizationInOutMonthData']!= null){
        this.second = res['organizationInOutMonthData'];
        this.getYearsIncomingData();
        this.getYearsOutgoingData();
        this.createIncomingData(this.second);
        this.createOutgoingData(this.second);
        this.getMaximumRangeNumber();
        if (this.dataSource[0].arg.indexOf('0')==-1) {
          this.disableClick = false;
        }
      }
      else{
        alert("No Register exists in selected Time Period for the organization.")
      }
      },
      error => {
        alert('some error occoured while getting departments');
        //this.getYearsIncomingData();
      }
    );
  }

  // getoneYearDataOutgoingForOneDepartment(year: any,departmentId: any){
  //   const url = 'http://127.0.0.1:8000/get/dairy/months/inout/' + departmentId + '/' + year;
  //   this.http.get<any>(url).subscribe(
  //     res => {
  //       this.third = [];
  //       if(res['organizationInOutMonthData']!= null){
  //       this.third = res['organizationInOutMonthData'];
  //       this.getYearsOutgoingData();
  //       this.createOutgoingData(this.second);
  //       this.getMaximumRangeNumber();
        
        
  //       }
  //       else{
  //         alert("No Register exists in selected Time Period for the organization.")
  //       }
        
  //     },
  //     error => {
  //       // alert('some error occoured while getting departments');
        
  //     }
  //   );
  // }

}
