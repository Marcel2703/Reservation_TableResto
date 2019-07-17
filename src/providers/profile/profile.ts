import { Injectable } from '@angular/core';
import {  HttpParams } from '@angular/common/http';
import {Api} from "../api/api";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Profile } from "../../models/profile";


/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(private api: Api) {

  }
  // Sending a GET request to /api/profiles/GetAllProfile
  getProfiles(): Observable<any> {
    return this.api.get('api/Profiles/GetAllProfile')
      .catch(this.api.handleError);
  }

  // Sending a Post request to /api/profiles/CreateProfile
  addProfile(profile: Profile): Observable<any> {
    return this.api.post('api/Profiles/CreateProfile', profile)
        .catch(this.api.handleError);
}


// Sending a PUT request to api/Profiles/Delete
deleteProfile(profile: Profile): Observable<any> {
  return this.api.put(`api/Profiles/Delete/${profile.id}`, profile)
    .catch(this.api.handleError);
  }

  // Support easy query params for GET renquests
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

  // Sending a Get request to api/Profiles/GetByProfileId
  getProfileByProfileId(id: any): Observable<any>{
    return this.api.get('api/Profiles/GetByProfileId/' + id)
    .catch(this.api.handleError);
 
  }

}
