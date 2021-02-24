import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataItem {
  arg!: string;
  val!: number;
  parentID!: string;

}



const data: DataItem[] = [
  {arg: 'Asia', val: 12, parentID: ''},
  {arg: 'North America', val: 12, parentID: ''},
  {arg: 'Europe', val: 12, parentID: ''},
  {arg: 'Africa', val: 12, parentID: ''},
  {arg: 'South America', val: 12, parentID: ''},
  {arg: 'Nigeria', val: 12, parentID: 'Africa'},
  {arg: 'Egypt', val: 12, parentID: 'Africa'},
  {arg: 'Congo', val: 22, parentID: 'Africa'},
  {arg: 'Morocco', val: 22, parentID: 'Africa'},
  {arg: 'China', val: 12, parentID: 'Asia'},
  {arg: 'India', val: 12, parentID: 'Asia'},
  {arg: 'Pakistan', val: 12, parentID: 'Asia'},
  {arg: 'Japan', val: 12, parentID: 'Asia'},
  {arg: 'Russia', val: 13, parentID: 'Europe'},
  {arg: 'Germany', val: 12, parentID: 'Europe'},
  {arg: 'Turkey', val: 12, parentID: 'Europe'},
  {arg: 'France', val: 12, parentID: 'Europe'},
  {arg: 'United Kingdom', val: 12, parentID: 'Europe'},
  {arg: 'United States', val: 12, parentID: 'North America'},
  {arg: 'Mexico', val: 12, parentID: 'North America'},
  {arg: 'Canada', val: 12, parentID: 'North America'},
  {arg: 'Cuba', val: 12, parentID: 'North America'},
  {arg: 'Brazil', val: 12, parentID: 'South America'},
  {arg: 'Colombia', val: 12, parentID: 'South America'},
  {arg: 'Venezuela', val: 12, parentID: 'South America'},
  {arg: 'Peru', val: 12, parentID: 'South America'},
  {arg: 'Chile', val: 12, parentID: 'South America'}
];

const colors: string[] = ['#6babac', '#e55253'];

@Injectable()
export class Service {
  filterData(name: any): DataItem[] {
    return data.filter((item) => {
      return item.parentID === name;
    });
  }

  getColors(): string[] {
    return colors;
  }
}
