import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileEmployeePage } from './profile-employee';

@NgModule({
  declarations: [
    ProfileEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileEmployeePage),
  ],
})
export class ProfileEmployeePageModule {}
