import {Component, OnInit} from '@angular/core';
import {DataServiceService} from '../services/data-service.service';
import {ElementRef} from '@angular/core';
import {DataItem, Service} from '../services/dataitem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chartapp';
  selectedDay: number = 1;
  allDepartments: any[] = [];
  departData: any[] = [];
  allDepartmentsasd: any = '';
  dataSource: DataItem[];
  colors: string[];
  service: Service;
  isFirstLevel: boolean;

  constructor(private dataService: DataServiceService, service: Service, element: ElementRef) {
    this.dataSource = service.filterData('');
    this.colors = service.getColors();
    this.service = service;
    this.isFirstLevel = true;
  }

  onButtonClick() {
    if (!this.isFirstLevel) {
      this.isFirstLevel = true;
      this.dataSource = this.service.filterData('');
    }
  }

  onPointClick(e: any) {
    if (this.isFirstLevel) {
      this.isFirstLevel = false;
      this.dataSource = this.service.filterData(e.target.originalArgument);
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
