import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataItem {
  arg!: string;
  val!: number;
  parentID!: string;
}


let newData: DataItem[] = [
  {arg: '2019', val: 123, parentID: ''},
  {arg: '2020', val: 12, parentID: ''},
  {arg: '2021', val: 13, parentID: ''},
  {arg: '2022', val: 14, parentID: ''},
  {arg: '2023', val: 15, parentID: ''},
  // {arg: 'Nigeria', val: 12, parentID: 'Africa'},
];

let oneData: DataItem[] = [

  {arg: 'January', val: 10, parentID: '123123'},
  {arg: 'Feb', val: 11, parentID: '123123'},
  {arg: 'March', val: 12, parentID: '123123'},
  {arg: 'April', val: 13, parentID: '123123'},
  {arg: 'May', val: 14, parentID: '123123'},
  {arg: 'June', val: 15, parentID: '123123'},
  {arg: 'July', val: 16, parentID: '123123'},
  {arg: 'August', val: 17, parentID: '123123'},
];
const colors: string[] = ['#6babac', '#e55253'];

@Injectable()
export class Service {

  constructor(private http: HttpClient) {
  }

  filterData(name: any): DataItem[] {
    return newData.filter((item) => {
      return item.parentID === name;
    });
  }

  getAllDepartments(): DataItem[] {
    const url = 'http://127.0.0.1:8000/get/organizations/';
    this.http.get<any>(url).subscribe(
      res => {
        newData = res;
        return res;

      },
      error => {
        alert('some error occoured while getting departments');
      }
    );
    return newData;
  }

  getoneYearDataForOneDepartment(department: any, year: any): DataItem[] {
    const url = '/api/get/dairy/inout/' + department + year;
    this.http.get<any>(url).subscribe(
      res => {
        oneData = res;
        return res;

      },
      error => {
       // alert('some error occoured while getting departments');
      }
    );
    return oneData;
  }


  getColors(): string[] {
    return colors;
  }
}
