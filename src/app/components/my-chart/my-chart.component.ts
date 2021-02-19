import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {Chart} from 'node_modules/chart.js';
import {DataServiceService} from '../../../services/data-service.service';

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
  allDepartmentsasd: any = '';
  incomingData: any[] = [];
  outGoingData: any[] = [];

  constructor(private dataService: DataServiceService) {
  }

  ngOnInit() {
    this.selectChangeHandler(null);
    this.allDepartments.push({"key": 1, "value": "asdasdasd"});
    this.allDepartments.push({"key": 2, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});


    this.incomingData = this.createIncomingData(this.departData);
    this.outGoingData = this.createOutgoingData(this.departData);

    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['2011', '2012', '2013', '2013', '2014', '2015', '2016'],
        datasets: [{
          label: '# of Votes',
          data: this.incomingData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
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
              beginAtZero: true
            }
          }]
        }
      }
    });

    var myChart = new Chart("myChart2", {
      type: 'bar',
      data: {
        labels: ['2011', '2012', '2013', '2013', '2014', '2015', '2016'],
        datasets: [{
          label: '# of Votes',
          data: this.outGoingData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
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
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  selectChangeHandler(event: any) {
    this.selectedDay = this.allDepartmentsasd;
    this.departData.push({Year: '2016', Incomingcount: 150, outgoingCount: 72});
    this.departData.push({Year: '2017', Incomingcount: 150, outgoingCount: 72});
    this.departData.push({Year: '2018', Incomingcount: 150, outgoingCount: 72});
    this.departData.push({Year: '2019', Incomingcount: 150, outgoingCount: 72});
    this.departData.push({Year: '2020', Incomingcount: 150, outgoingCount: 72});
    this.departData.push({Year: '2021', Incomingcount: 150, outgoingCount: 72});
    // [] = this.dataService.getItems(this.selectedDay);
    console.log(this.departData);
  }

  createIncomingData(departData: any[]) {

    let index = 0;
    for (index; index < departData.length; ++index) {
      this.incomingData.push(departData[index].Incomingcount);
    }
    return this.incomingData;
  }

  createOutgoingData(departData: any[]) {

    let index = 0;
    for (index; index < departData.length; ++index) {
      this.outGoingData.push(departData[index].outgoingCount);
    }
    return this.outGoingData;
  }

}
