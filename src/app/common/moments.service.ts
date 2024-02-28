import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Posts } from './posts';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  constructor(private http: HttpClient) { }

  retriveNextMoment(pageNumber: number, pageSize: number): Observable<Posts[]>{
    var url = environment.API_URL + `/moments/v1/posts?page=${pageNumber}&size=${pageSize}`;
    return this.http.get<any>(url, this.getHeader()).pipe(
      map(data => data.content as Posts[])
    );
  }

  getHeader(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
