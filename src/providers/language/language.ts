import {  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Language } from "../../models/language";

/*
  Generated class for the LanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LanguageProvider {

  constructor(public api: Api) {
    console.log('Hello LanguageProvider Provider');
  }

     // Sending a GET request to api/Languages/GetAllLanguages
     getLanguages(): Observable<any> {
      return this.api.get('api/Languages/GetAllLanguages')
          .catch(this.api.handleError);
  }
  
   // Sending a POST request to api/Languages/CreateLanguage
  addLanguage(language: any): Observable<any> {
    return this.api.post('api/Languages/CreateLanguage', language)
        .catch(this.api.handleError);
  }
  
   // Sending a PUT request to api/Languages/Delete
deleteLanguage(language: Language): Observable<any> {
  return this.api.put(`api/Languages/Delete/${language.id}`, language)
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
