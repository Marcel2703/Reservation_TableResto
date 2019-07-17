import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListLanguagePage } from './list-language';

@NgModule({
  declarations: [
    ListLanguagePage,
  ],
  imports: [
    IonicPageModule.forChild(ListLanguagePage),
  ],
})
export class ListLanguagePageModule {}
