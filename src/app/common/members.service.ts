import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from './credentials';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  registerCredentials(newCred: Credentials){
    var url = environment.API_URL + '/members/v1/creds';
    return this.http.post(url, newCred, this.getHeader());
  }

  getHeader(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
