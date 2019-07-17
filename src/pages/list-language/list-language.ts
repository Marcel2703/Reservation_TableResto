import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {LanguageProvider} from "../../providers/language/language";
import { Language } from '../../models/language';

/**
 * Generated class for the ListLanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-language',
  templateUrl: 'list-language.html',
})
export class ListLanguagePage {
  languages: Array<any>;
  loadingList = false;
  language = new Language();
  errors = [];
  loading: any;

  // Our translated text strings
  private ListLanguageErrorString: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public languageProvider: LanguageProvider,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.showLoader(); 
    this.languageProvider.getLanguages()
    .subscribe( res => {
      if (res['success'] === true) {
        this.loading.dismiss();
        if (Array.isArray(res['data'])) {
          this.languages = res['data'];
          console.log(this.languages); 
        }
      }
    },
    err => {
      this.loadingList = false;
      this.translateService.get(err).subscribe((value) => {
        this.ListLanguageErrorString = value;
      });
      let toast = this.toastCtrl.create({
        message: this.ListLanguageErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.loading.dismiss();
    });
  }

  presentConfirm(language) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Etes-vous sûr de supprimer cet language  '+ language.languageName,
      buttons: [
        {
          text: 'Supprimer',
          handler: () => {
            this.delete(language);
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  addlanguage() {
    this.navCtrl.push('AddLanguagePage');
  }

  showLanguageDetails(language: any){
    this.navCtrl.push('EditLanguagePage', {
      language : language
    });   
   }

   delete(language):void
   {
     this.languageProvider.deleteLanguage(language).subscribe(
       res => {
         if (res['success'] === true)
         {
           this.translateService.get(res['message']).subscribe((value) => {
             this.ListLanguageErrorString = value;
           });
           let toast = this.toastCtrl.create({
             message: this.ListLanguageErrorString,
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
           this.ListLanguageErrorString = value;
         });
         let toast = this.toastCtrl.create({
           message: this.ListLanguageErrorString,
           duration: 3000,
           position: 'top'
         });
         toast.present();
       }
     );
   }

   listlanguage() {
    this.navCtrl.push('ListLanguagePage');
  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: "chargement page langue..."
    });
 
    this.loading.present();
 
  }

}
