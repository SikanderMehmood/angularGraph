import {Component, OnInit} from '@angular/core';
import {DataServiceService} from '../services/data-service.service';
import {ElementRef} from '@angular/core';
import {DataItem, Service} from '../services/dataitem.service';
import {HttpClient} from '@angular/common/http';

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
  colors: string[];
  service: Service;
  isFirstLevel: boolean;


  constructor(private dataService: DataServiceService, service: Service, element: ElementRef, private http: HttpClient) {
    this.dataSource = service.getAllDepartments();
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

  ngOnInit() {
    const url = 'http://127.0.0.1:8000/get/organizations/';
    this.http.get<any>(url).subscribe(
      res => {


        this.allDepartments = res;
        console.log(this.allDepartments);


      },
      error => {
        this.allDepartments = this.arrsdas;
        alert('some error occoured while getting departments');
      }
    );
  }


  onButtonClick() {
    if (!this.isFirstLevel) {
      this.isFirstLevel = true;
      this.dataSource = this.service.getAllDepartments();
    }
  }

  onPointClick(e: any) {
    if (this.isFirstLevel) {
      this.isFirstLevel = false;
      this.dataSource = this.service.getoneYearDataForOneDepartment(e.target.originalArgument, this.departmentId);
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
}
