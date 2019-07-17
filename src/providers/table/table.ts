import {  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Table } from '../../models/table';

/*
  Generated class for the TableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TableProvider {

  constructor(public api: Api) {
    console.log('Hello TableProvider Provider');
  }

   // Sending a GET request to api/Tables/GetAllTable
   getTables(): Observable<any> {
    return this.api.get('api/Tables/GetAllTable')
        .catch(this.api.handleError);
}

   // Sending a GET request to api/Tables/GetAllTableLibre
   getTableLibres(): Observable<any> {
    return this.api.get('api/Tables/GetAllTableLibre')
        .catch(this.api.handleError);
}

 // Sending a POST request to api/Tables/CreateTable
addTable(table: any): Observable<any> {
  return this.api.post('api/Tables/CreateOrUpdateTable', table)
      .catch(this.api.handleError);
}

// Sending a PUT request to api/Tables/Delete
deleteTable(table: Table): Observable<any> {
  return this.api.put(`api/Tables/Delete/${table.id}`, table)
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

}
