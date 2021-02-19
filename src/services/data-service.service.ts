import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  dummyresult: any[] = [];

  getItems(id) {
    let url = '/api/get/dairy/inout/' + id;
    this.http.get(url).pipe(map(data => {
    })).subscribe(result => {
        return result;
      },
      error1 => {
        alert('Some error while getting response');
      });
  }

  constructor(public http: HttpClient) {
  }
}
