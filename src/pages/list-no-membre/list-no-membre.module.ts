import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListNoMembrePage } from './list-no-membre';

@NgModule({
  declarations: [
    ListNoMembrePage,
  ],
  imports: [
    IonicPageModule.forChild(ListNoMembrePage),
  ],
})
export class ListNoMembrePageModule {}
