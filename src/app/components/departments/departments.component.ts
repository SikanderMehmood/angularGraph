import {Component, OnInit} from '@angular/core';
import {DepartData} from '../../../models/DepartData';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Department} from '../../../models/Department';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  allDepartments: Department[] = [];
  departData: DepartData[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.getAllDepartments();
    // this.getAllDataForOneDepartMent();
  }

  getAllDataForOneDepartMent() {
    const url = '/api/singleUni/' + this.route.snapshot.params['id'];
    this.http.get<DepartData[]>(url).subscribe(
      res => {
        this.departData = res;
        console.log(res);
      },
      err => {
        alert('Some error occoured while getting universities');
      }
    );
  }

   getAllDepartments() {
    const url = '/api/allDepartments';
    this.http.get<Department[]>(url).subscribe(
      res => {
        this.allDepartments = res;
        console.log(res);
      },
      error => {
        alert('some error occoured while getting departments');
      }
    );
  }
}
