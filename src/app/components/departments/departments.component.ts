import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DepartData} from '../../../models/DepartData';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Department} from '../../../models/Department';
import {DataServiceService} from '../../../services/data-service.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  allDepartments: Department[] = [];
  departData: DepartData[] = [];

  @Input() incomingData: any[] = [];
  @Input() outgoingData: any[] = [];
  @Input() yearData: any[] = [];
  condition: Boolean = true;


  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  myarray: any[] = [];
  myarray2: any[] = [];

  public barChartData: ChartDataSets[] = [
    {data: this.myarray, label: '# of Incoming Registers'},
    {data: this.myarray2, label: '# of Outgoing Registers'}
  ];


  myfunction(array1: any, array2: any, years: any) {

    if (this.barChartLabels.length != 0) {
      this.barChartLabels = [];
      this.myarray = [];
      this.myarray2 = [];
    }

    years.forEach((obj, index) => {
      this.barChartLabels.push(obj);
    });

    array1.forEach((obj, index) => {
      this.myarray.push(obj);
    });

    array2.forEach((obj, index) => {
      this.myarray2.push(obj);
    });


  }


}
