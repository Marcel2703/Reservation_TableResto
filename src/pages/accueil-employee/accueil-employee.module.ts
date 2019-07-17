import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccueilEmployeePage } from './accueil-employee';

@NgModule({
  declarations: [
    AccueilEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(AccueilEmployeePage),
  ],
  exports: [
    AccueilEmployeePage
  ]
})
export class AccueilEmployeePageModule {}
