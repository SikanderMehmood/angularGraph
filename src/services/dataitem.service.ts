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
  {arg: '123123', val: 100, parentID: ''},
  {arg: 'North America', val: 12, parentID: ''},
  {arg: 'Europe', val: 12, parentID: ''},
  {arg: 'Africa', val: 12, parentID: ''},
  {arg: 'South America', val: 12, parentID: ''},
  // {arg: 'Nigeria', val: 12, parentID: 'Africa'},
  // {arg: 'Egypt', val: 12, parentID: 'Africa'},
  // {arg: 'Congo', val: 22, parentID: 'Africa'},
  // {arg: 'Morocco', val: 22, parentID: 'Africa'},
  // {arg: 'China', val: 12, parentID: 'Asia'},
  // {arg: 'India', val: 12, parentID: 'Asia'},
  // {arg: 'Pakistan', val: 12, parentID: 'Asia'},
  // {arg: 'Japan', val: 12, parentID: 'Asia'},
  // {arg: 'Russia', val: 13, parentID: 'Europe'},
  // {arg: 'Germany', val: 12, parentID: 'Europe'},
  // {arg: 'Turkey', val: 12, parentID: 'Europe'},
  // {arg: 'France', val: 12, parentID: 'Europe'},
  // {arg: 'United Kingdom', val: 12, parentID: 'Europe'},
  // {arg: 'United States', val: 12, parentID: 'North America'},
  // {arg: 'Mexico', val: 12, parentID: 'North America'},
  // {arg: 'Canada', val: 12, parentID: 'North America'},
  // {arg: 'Cuba', val: 12, parentID: 'North America'},
  // {arg: 'Brazil', val: 12, parentID: 'South America'},
  // {arg: 'Colombia', val: 12, parentID: 'South America'},
  // {arg: 'Venezuela', val: 12, parentID: 'South America'},
  // {arg: 'Peru', val: 12, parentID: 'South America'},
  // {arg: 'Chile', val: 12, parentID: 'South America'}
];

let oneData: DataItem[] = [

  {arg: 'Nigeria', val: 12, parentID: 'Africa'},
  {arg: 'Egypt', val: 12, parentID: 'Africa'},
  {arg: 'Congo', val: 22, parentID: 'Africa'},
  {arg: 'Morocco', val: 22, parentID: 'Africa'},
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
        alert('some error occoured while getting departments');
      }
    );
    return oneData;
  }


  getColors(): string[] {
    return colors;
  }
}
