import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMotifPage } from './add-motif';

@NgModule({
  declarations: [
    AddMotifPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMotifPage),
  ],
})
export class AddMotifPageModule {}
