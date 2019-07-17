import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsEmployeePage } from './tabs-employee';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    TabsEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(TabsEmployeePage),
    SuperTabsModule,
  ],
})
export class TabsEmployeePageModule {}
