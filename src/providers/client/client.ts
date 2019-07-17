import {  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Client } from "../../models/client";

/*
  Generated class for the ClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientProvider {

  constructor(private api: Api) {
    console.log('Hello ClientProvider Provider');
  }

    // Sending a GET request to api/Clients/GetAllClient
    getClients(): Observable<any> {
      return this.api.get('api/Clients/GetAllClient')
          .catch(this.api.handleError);
  }
  
   // Sending a POST request to api/Clients/CreateClient
  addClient(client: any): Observable<any> {
    return this.api.post('api/Clients/CreateClient', client)
        .catch(this.api.handleError);
  }
  
   // Sending a PUT request to api/Clients/CreateClient
  deleteClient(client: any, params: any): Observable<any> {
    return this.api.put('api/Clients/Delete' + client.id, client,
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

}
