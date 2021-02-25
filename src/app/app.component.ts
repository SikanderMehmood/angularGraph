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
  disableClick: any = true;

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

  second: any = [
    {Label: '10', Incomingcount: 11, outgoingCount: 9},
    {Label: '11', Incomingcount: 12, outgoingCount: 12},
    {Label: '12', Incomingcount: 13, outgoingCount: 13},
    {Label: '13', Incomingcount: 14, outgoingCount: 14},
  ];

  ngOnInit() {
    const url = 'http://127.0.0.1:8000/get/organizations/';
    this.http.get<any>(url).subscribe(
      res => {
        this.allDepartments = res;
        console.log(this.allDepartments);
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

  onPointClick(e: any) {
    if (this.service.getDisableClickValue()) {
      if (this.isFirstLevel) {
        this.isFirstLevel = false;
        this.dataSource = this.service.getoneYearDataIncomingForOneDepartment(e.target.originalArgument, this.departmentId);
        this.dataSource2 = this.service.getoneYearDataOutgoingForOneDepartment(e.target.originalArgument, this.departmentId);
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

  selectChangeHandler() {
    this.departData = [];
    this.incomingData = [];
    this.outGoingData = [];
    this.barChatIncomingData = [];
    this.barChatOutgoingData = [];
    this.years = [];
    let startDate = this.datepipe.transform(this.range.value['start'], 'yyyy-MM-dd');
    let endDate = this.datepipe.transform(this.range.value['end'], 'yyyy-MM-dd');
    let url = 'http://127.0.0.1:8000/get/dairy/inout/' + this.departmentId + '/' + startDate + '/' + endDate;
    this.http.get<any>(url).subscribe(
      res => {
        if (res['organizationInOutListCount'] != null) {
          this.departData = res['organizationInOutListCount'];
          console.log(this.departData);
          this.incomingData = this.createIncomingData(this.departData);
          this.outGoingData = this.createOutgoingData(this.departData);
          this.years = this.createYears(this.departData);
          this.barChatIncomingData = this.incomingData;
          this.barChatOutgoingData = this.outGoingData;
          this.barYearData = this.years;
        }
        else {
          this.incomingData = [];
          this.outGoingData = [];

          alert('No Register exists in selected Time Period for the organization.');

        }
      },
      error => {
        this.departData = this.second;
        this.colors = this.service.getColors();
        this.dataSource = this.service.getAllIncomingData();
        this.dataSource2 = this.service.getAllOutGoingData();
      }
    );


  }
}
