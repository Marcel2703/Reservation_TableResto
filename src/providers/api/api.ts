import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url : string = 'http://localhost:2205';


  constructor(public http: HttpClient) {
  }




  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error.error instanceof Error) {
      // client-side or network error
      errMsg = 'An error occurred : ' + error.error.message ;
    } else {
      // backend returned an unsuccessful response code
      switch (error.status) {
        case 0:
          errMsg = 'Le serveur est momentanément indisponible. Veuillez réessayer plus tard';
          break;
        case 401:
          errMsg = 'Une authentification est nécessaire pour accéder à la ressource. (Erreur 401)';
          break;
        case 500:
          errMsg = 'Une erreur interne venant du serveur est survenue. (Erreur 500)';
          break;
        default: errMsg = `Error ${error.status} : ${error.statusText}<br/>
                    ${error.message}`;
          break;
      }
    }
    return Observable.throw(errMsg);
  }

  public extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
