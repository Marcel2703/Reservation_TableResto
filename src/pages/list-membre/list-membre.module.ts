import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMembrePage } from './list-membre';

@NgModule({
  declarations: [
    ListMembrePage,
  ],
  imports: [
    IonicPageModule.forChild(ListMembrePage),
  ],
})
export class ListMembrePageModule {}
