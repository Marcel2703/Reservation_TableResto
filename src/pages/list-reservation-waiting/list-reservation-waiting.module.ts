import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListReservationWaitingPage } from './list-reservation-waiting';

@NgModule({
  declarations: [
    ListReservationWaitingPage,
  ],
  imports: [
    IonicPageModule.forChild(ListReservationWaitingPage),
  ],
})
export class ListReservationWaitingPageModule {}
