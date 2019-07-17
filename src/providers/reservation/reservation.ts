import { Injectable } from '@angular/core';
import {  HttpParams } from '@angular/common/http';
import {Api} from "../api/api";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Reservation } from '../../models/reservation';

/*
  Generated class for the ReservationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReservationProvider {

  constructor(private api: Api) {
    console.log('Hello ReservationProvider Provider');
  }

   // Sending a Post request to /api/reservations/CreateOrUpdateBusiness
   addReservation(reservation: Reservation): Observable<any> {
    return this.api.post('api/Reservations/CreateReservation', reservation)
        .catch(this.api.handleError);
}

 // Sending a GET request to /api/profiles/GetAllProfile
 getWaitingReservations(): Observable<any> {
  return this.api.get('api/Reservations/GetAllReservationWaiting')
    .catch(this.api.handleError);
}

// Sending a PUT request to api/Reservations/ValidReservation
ValidReservation(reservation: Reservation): Observable<any> {
  return this.api.put(`api/Reservations/ValidReservation/${reservation.id}`, reservation)
    .catch(this.api.handleError);

  }
  
  // Sending a PUT request to api/Reservations/CancelReservation
  CancelReservation(reservation: Reservation): Observable<any> {
  return this.api.put(`api/Reservations/CancelReservation/${reservation.id}`, reservation)
    .catch(this.api.handleError);
  }
  


 // Sending a GET request to /api/profiles/GetAllProfile
 getReservationIsValid(): Observable<any> {
  return this.api.get('api/Reservations/GetAllReservationIsValid')
    .catch(this.api.handleError);
}

 // Sending a GET request to /api/profiles/GetAllProfile
 getReservations(): Observable<any> {
  return this.api.get('api/Reservations/GetAllReservation')
    .catch(this.api.handleError);
}

 // Sending a GET request to api/Reservations/GetReservationByClient
 getReservationByClient(id): Observable<any> {
  return this.api.get('api/Reservations/GetReservationByClient', {ClientId: id})
      .catch(this.api.handleError);
}

}
