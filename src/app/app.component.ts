import {Component, OnInit} from '@angular/core';
import {Department} from '../models/Department';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chartapp';
  selectedDay: number = 1;
  allDepartments: any[] = [];
  allDepartmentsasd: any = '';

  ngOnInit() {

    this.allDepartments.push({"key": 1, "value": "asdasdasd"});
    this.allDepartments.push({"key": 2, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 1, "value": "asdasdasd"});
    this.allDepartments.push({"key": 2, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 1, "value": "asdasdasd"});
    this.allDepartments.push({"key": 2, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});
    this.allDepartments.push({"key": 3, "value": "asdasdasd"});

  }


  selectChangeHandler(event: any) {
    this.selectedDay = this.allDepartmentsasd;
    console.log(this.selectedDay);
  }
}
