import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginCountEmployeeRestoPage } from './login-count-employee-resto';
import { PersistenceModule } from 'angular-persistence';

@NgModule({
  declarations: [
    LoginCountEmployeeRestoPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginCountEmployeeRestoPage),
    PersistenceModule
  ],
})
export class LoginCountEmployeeRestoPageModule {}
