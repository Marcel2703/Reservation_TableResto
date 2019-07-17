import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsProfilePage } from './details-profile';

@NgModule({
  declarations: [
    DetailsProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsProfilePage),
  ],
})
export class DetailsProfilePageModule {}
