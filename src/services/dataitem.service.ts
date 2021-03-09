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

  


  getColors(): string[] {
    return colors;
  }
}
