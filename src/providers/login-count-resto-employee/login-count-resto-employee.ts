import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import { Observable } from 'rxjs/Observable';
import {  HttpHeaders, HttpParams} from '@angular/common/http';


/*
  Generated class for the LoginCountRestoEmployeeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginCountRestoEmployeeProvider {

  constructor(public api: Api) {
    console.log('Hello LoginCountRestoEmployeeProvider Provider');
  }

  login(employee: any): Observable<any> {
const headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let postData = {
      'email': employee.email,
      'password': employee.password
}
 
    return this.api.post('api/LoginEmployees/LoginEmployees', postData, { headers: headers }
    )
       .catch(this.api.handleError);
}

loginClient(client: any): Observable<any> {
  const headers = new HttpHeaders();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let postData = {
        'email': client.email,
        'password': client.password
  }
   
      return this.api.post('api/LoginClients/LoginClients', postData, { headers: headers }
      )
         .catch(this.api.handleError);
  }


refreshToken(): Observable<any> {
  return this.api.post('api/refresh-token',
      { jwtToken: localStorage.getItem('token')})
  .catch(this.api.handleError);
}

sendRecovery(email: any): Observable<any> {
  return this.api.post('api/LoginEmployees/SendLinkToEmail', {
      identifier: email,
      baseUrl: window.location.origin
  })
      .catch(this.api.handleError);
}

resetPassword(password: string, token: string): Observable<any> {
  return this.api.post('api/LoginEmployees/reset-password', {password: password}, {
      params: new HttpParams().set('token', token)
  })
      .catch(this.api.handleError);
}

logout(): Observable<any> {
  // const token = localStorage.getItem('token').split(' ')[1];
  // return this.http.post(this.appConfig.getConfig('apiUrl') + '/api/logout', { jwtToken: token })
  //     .catch(this.handleError);
  return this.api.get('assets/mock/logout.json');
}


}
