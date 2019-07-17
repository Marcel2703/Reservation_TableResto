import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuEmployeePage } from './menu-employee';

@NgModule({
  declarations: [
    MenuEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(MenuEmployeePage),
  ],
})
export class MenuEmployeePageModule {}
