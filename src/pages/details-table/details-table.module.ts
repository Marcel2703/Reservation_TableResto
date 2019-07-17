import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsTablePage } from './details-table';

@NgModule({
  declarations: [
    DetailsTablePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsTablePage),
  ],
})
export class DetailsTablePageModule {}
