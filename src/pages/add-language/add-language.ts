import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,NavParams } from 'ionic-angular';
import {LanguageProvider} from "../../providers/language/language";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from "../../models/language";
import {FormUtilsService} from "../../providers/shared/form-utils.service";

/**
 * Generated class for the AddLanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-language',
  templateUrl: 'add-language.html',
})
export class AddLanguagePage {
  form: FormGroup;
  language = new Language();
  errors = [];
  loading: any;
  showErrors = false;
  // Our translated text strings
  private AddLanguageErrorString: string;
  private AddLanguageMessageString: string;

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public languageProvider: LanguageProvider,
    private formService: FormUtilsService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

      this.form = this.fb.group({
        'languageCode': ['', Validators.required],
        'languageName': ['', Validators.required]
      });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLanguagePage');
  }

  addLanguage(): void {
    if (this.form.valid)
    {
      this.languageProvider.addLanguage(this.language).subscribe(
        res => {
          this.formService.markAsPristine(this.form); 
          if (res['success'] === true)
          {
            this.translateService.get(res['message']).subscribe((value) => {
              this.AddLanguageMessageString = value;
            });
            let toast = this.toastCtrl.create({
              message: this.AddLanguageMessageString,
              duration: 3000,
              position: 'top'
            });
  
            toast.onDidDismiss(() => {
              this.listlanguage();
            });
          
            toast.present();
          } 
          else
          {
            if (res['ErrorsMessages'].length > 0) {
              this.errors = res['ErrorsMessages'];
            }
          }     
        },
        err => {
  
          this.translateService.get(err).subscribe((value) => {
            this.AddLanguageErrorString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.AddLanguageErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      );

    }
    else
    {
      this.showErrors = true;
    }
    
  }

  listlanguage() {
    this.navCtrl.push('ListLanguagePage');
  }

  hasError(field: string): boolean {
    return this.formService.hasError(field, this.errors);
  }

  getError(field: string): string {
    return this.formService.getError(field, this.errors);
  }


}
