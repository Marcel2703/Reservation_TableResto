import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLanguagePage } from './add-language';

@NgModule({
  declarations: [
    AddLanguagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddLanguagePage),
  ],
})
export class AddLanguagePageModule {}
