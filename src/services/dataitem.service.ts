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


let incomingData: DataItem[] = [
  // {arg: '2019', val: 123, parentID: ''},
  // {arg: '2020', val: 12, parentID: ''},
  // {arg: '2021', val: 13, parentID: ''},
  // {arg: '2022', val: 14, parentID: ''},
  // {arg: '2023', val: 15, parentID: ''},
];

let outgoingData: DataItem[] = [
  // {arg: '2019', val: 123, parentID: ''},
  // {arg: '2020', val: 12, parentID: ''},
  // {arg: '2021', val: 13, parentID: ''},
  // {arg: '2022', val: 14, parentID: ''},
  // {arg: '2023', val: 15, parentID: ''},
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

  second = [
    {Label: '2019', Incomingcount: 11, outgoingCount: 14}
  ];

  constructor(private http: HttpClient) {
  }

  disableClick: any = true;

  getDisableClickValue(): boolean {
    return this.disableClick;
  }

  myarray: any[] = [];


  getYearsOutgoingData(): any {
    this.second.forEach((obj, index) => {
      outgoingData.push({'arg': obj.Label, 'val': obj.outgoingCount, 'parentID': ''});
    });
  }

  getYearsIncomingData(): any {
    this.second.forEach((obj, index) => {
      incomingData.push({'arg': obj.Label, 'val': obj.Incomingcount, 'parentID': ''});
    });
  }

  // getMonthsIncomingData(): DataItem[] {
  //
  // }
  //
  // getMonthsOutGoingData(): DataItem[] {
  //
  // }

  getAllIncomingData(): DataItem[] {
    const url = 'http://127.0.0.1:8000/get/yearsData/';
    this.http.get<any>(url).subscribe(
      res => {
        incomingData = res;
        return res;

      },
      error => {
        alert('some error while getting years data');
        this.getYearsIncomingData();
        if (incomingData[0].arg.length < 4) {
          this.disableClick = false;
        }
      }
    );
    return incomingData;
  }

  getAllOutGoingData(): DataItem[] {
    const url = 'http://127.0.0.1:8000/get/yearsData/';
    this.http.get<any>(url).subscribe(
      res => {
        incomingData = res;
        return res;

      },
      error => {
        alert('some error while getting years data');
        this.getYearsOutgoingData();
      }
    );
    return outgoingData;
  }

  getoneYearDataIncomingForOneDepartment(department: any, year: any): DataItem[] {
    const url = '/api/get/dairy/inout/' + department + year;
    this.http.get<any>(url).subscribe(
      res => {
        oneData = res;
        return res;

      },
      error => {
        // alert('some error occoured while getting departments');
        this.getYearsIncomingData();
      }
    );
    return incomingData;
  }

  getoneYearDataOutgoingForOneDepartment(department: any, year: any): DataItem[] {
    const url = '/api/get/dairy/inout/' + department + year;
    this.http.get<any>(url).subscribe(
      res => {
        oneData = res;
        return res;

      },
      error => {
        // alert('some error occoured while getting departments');
        this.getYearsOutgoingData();
      }
    );
    return outgoingData;
  }


  getColors(): string[] {
    return colors;
  }
}
