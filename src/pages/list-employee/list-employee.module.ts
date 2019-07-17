import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEmployeePage } from './list-employee';

@NgModule({
  declarations: [
    ListEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(ListEmployeePage),
  ],
})
export class ListEmployeePageModule {}
