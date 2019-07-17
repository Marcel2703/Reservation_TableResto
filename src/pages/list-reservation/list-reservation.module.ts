import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListReservationPage } from './list-reservation';

@NgModule({
  declarations: [
    ListReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(ListReservationPage),
  ],
})
export class ListReservationPageModule {}
