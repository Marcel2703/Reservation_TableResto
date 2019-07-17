import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsReservationPage } from './tabs-reservation';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    TabsReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsReservationPage),
    SuperTabsModule,
  ],
})
export class TabsReservationPageModule {}
