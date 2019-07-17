import {  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Employee } from "../../models/employee";

/*
  Generated class for the EmployeeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmployeeProvider {

  constructor(private api: Api) {
    console.log('Hello EmployeeProvider Provider');
  }
 
   // Sending a GET request to api/Employees/GetAllEmployee
  getEmployees(): Observable<any> {
    return this.api.get('api/Employees/GetAllEmployee')
        .catch(this.api.handleError);
}

   // Sending a GET request to api/Employees/GetMembre
   getMembre(): Observable<any> {
    return this.api.get('api/Employees/GetMembre')
        .catch(this.api.handleError);
}

  // Sending a GET request to api/Employees/GetMembre
  getEmail(email): Observable<any> {
    return this.api.get('api/Employees/GetByEmail', {param: email})
        .catch(this.api.handleError);
}

   // Sending a GET request to api/Employees/GetNoMembre
   getNoMembre(): Observable<any> {
    return this.api.get('api/Employees/GetNoMembre')
        .catch(this.api.handleError);
}

   // Sending a GET request to api/Employees/ValidInscription
   ValidIscription(): Observable<any> {
    return this.api.get('api/Employees/ValidInscription')
        .catch(this.api.handleError);
}

 // Sending a POST request to api/Employees/CreateEmployee
addEmployee(employee: any): Observable<any> {
  return this.api.post('api/Employees/CreateEmployee', employee)
      .catch(this.api.handleError);
}



 // Sending a PUT request to api/Employees/CreateEmployee
deleteEmployee(employee: any, params: any): Observable<any> {
  return this.api.put('api/Employees/Delete' + employee.id, employee,
      { params: this.getHttpParams(params) })
      .catch(this.api.handleError);
}

// Support easy query params for GET requests
private getHttpParams(args: any) {
  let params = new HttpParams();
  Object.keys(args)
      .filter(key => args[key] != null)
      .forEach(key => {
          Array.isArray(args[key]) ?
              args[key].forEach((item, i) => params = params.append(`${key}[${i}]`, item)) :
              params = params.append(key, args[key]);
      });
  return params;
}

getProfileIdEmployees(profileId: any): Observable<any> {
  return this.api.get(`api/Employees/Delete/${profileId}`)
    .catch(this.api.handleError);
}


}
