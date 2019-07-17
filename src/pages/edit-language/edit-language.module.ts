import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditLanguagePage } from './edit-language';

@NgModule({
  declarations: [
    EditLanguagePage,
  ],
  imports: [
    IonicPageModule.forChild(EditLanguagePage),
  ],
})
export class EditLanguagePageModule {}
