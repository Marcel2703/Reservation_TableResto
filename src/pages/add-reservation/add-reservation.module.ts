import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddReservationPage } from './add-reservation';

@NgModule({
  declarations: [
    AddReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(AddReservationPage),
  ],
})
export class AddReservationPageModule {}
