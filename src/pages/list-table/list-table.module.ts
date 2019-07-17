import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTablePage } from './list-table';

@NgModule({
  declarations: [
    ListTablePage,
  ],
  imports: [
    IonicPageModule.forChild(ListTablePage),
  ],
})
export class ListTablePageModule {}
