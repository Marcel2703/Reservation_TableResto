import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListClientPage } from './list-client';

@NgModule({
  declarations: [
    ListClientPage,
  ],
  imports: [
    IonicPageModule.forChild(ListClientPage),
  ],
})
export class ListClientPageModule {}
