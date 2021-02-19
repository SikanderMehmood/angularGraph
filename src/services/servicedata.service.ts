// import {Injectable} from '@angular/core';
// import {DepartData} from '../models/DepartData';
// import {Department} from '../models/Department';
// import {HttpClient} from '@angular/common/http';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ServicedataService {
//
//   constructor(private http: HttpClient) {
//   }
//
//
//   public getAllDepartments() {
//     const url = '/api/allDepartments';
//     return this.http.get(url).map(res => {
//
//       return res;
//
//     });
//
//   }
//
//   public getAllDataForOneDepartMent(id){
//     return  this.http.get(url).map(res=>{
//
//       return res;
//
//     })
//   }
//
//
//   getAllDataForOneDepartMent(id) {
//     let url = "/api/singleUni/"+id;
//     this.http.get<DepartData[]>(url).subscribe(
//       res => {
//         this.departData = res;
//         console.log(res);
//       },
//       err => {
//         alert('Some error occoured while getting universities');
//       }
//     );
//   }
//
//   // getAllDepartments() {
//   //   const url = '/api/allDepartments';
//   //   this.http.get<Department[]>(url).subscribe(
//   //     res => {
//   //       this.allDepartments = res;
//   //       console.log(res);
//   //     },
//   //     error => {
//   //       alert('some error occoured while getting departments');
//   //     }
//   //   );
//   // }
// }
