import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsClientPage } from './tabs-client';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    TabsClientPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsClientPage),
    SuperTabsModule,
  ],
})
export class TabsClientPageModule {}
