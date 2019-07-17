import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsLanguagePage } from './details-language';

@NgModule({
  declarations: [
    DetailsLanguagePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsLanguagePage),
  ],
})
export class DetailsLanguagePageModule {}
