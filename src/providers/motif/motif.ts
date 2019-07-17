import {  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Motif } from "../../models/motif";
/*
  Generated class for the MotifProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MotifProvider {

  constructor(public api: Api) {
    console.log('Hello MotifProvider Provider');
  }

   // Sending a GET request to api/Motifs/GetAllMotif
   getMotifs(): Observable<any> {
    return this.api.get('api/Motifs/GetAllMotif')
        .catch(this.api.handleError);
}

 // Sending a POST request to api/Motifs/CreateMotif
addMotif(motif: any): Observable<any> {
  return this.api.post('api/Motifs/CreateMotif', motif)
      .catch(this.api.handleError);
}

// Sending a PUT request to api/Motifs/Delete
deleteMotif(motif: Motif): Observable<any> {
  return this.api.put(`api/Motifs/Delete/${motif.id}`, motif)
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
