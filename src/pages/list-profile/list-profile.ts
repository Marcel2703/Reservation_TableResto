import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import {ProfileProvider} from "../../providers/profile/profile";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from "../../models/profile";
import {FormUtilsService} from "../../providers/shared/form-utils.service";



/**
 * Generated class for the ListProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-profile',
  templateUrl: 'list-profile.html',
})
export class ListProfilePage {
  profiles: Array<any>;
  loadingList = false;
  form: FormGroup;
  profile = new Profile();
  errors = [];
  loading: any;
  loadingAdd = false;
  logoChanged = false;
  isUpdate = false;
  currentUrl: string;
  showErrors = false;

   // Our translated text strings
   private AddProfileErrorString: string;
   private AddProfileMessageString: string;

  // Our translated text strings
  private ListProfileErrorString: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public profileProvider: ProfileProvider,
    private formService: FormUtilsService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private loadingCtrl: LoadingController,
    public modalCtrl : ModalController,
    public alertCtrl: AlertController) { 

      this.form = this.fb.group({
        'profileRole': ['', Validators.required]

      });
  }

  ionViewDidLoad() {
    this.showLoader(); 
    this.getProfile();
  }


  addProfile(): void {
    this.profileProvider.addProfile(this.profile).subscribe(
      res => {
        this.formService.markAsPristine(this.form); 
        if (res['success'] === true)
        {
          this.translateService.get(res['message']).subscribe((value) => {
            this.AddProfileMessageString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.AddProfileMessageString,
            duration: 3000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
            this.listprofile();
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
          this.AddProfileErrorString = value;
        });
        let toast = this.toastCtrl.create({
          message: this.AddProfileErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );
  }

  delete(profile):void
  {
    this.profileProvider.deleteProfile(profile).subscribe(
      res => {
        if (res['success'] === true)
        {
          this.translateService.get(res['message']).subscribe((value) => {
            this.AddProfileMessageString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.AddProfileMessageString,
            duration: 3000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
            this.listprofile();
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
          this.AddProfileErrorString = value;
        });
        let toast = this.toastCtrl.create({
          message: this.AddProfileErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );
  }

  listprofile() {
    this.navCtrl.push('ListProfilePage');
  }

  hasError(field: string): boolean {
    return this.formService.hasError(field, this.errors);
  }

  getError(field: string): string {
    return this.formService.getError(field, this.errors);
  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: "chargement liste profile..."
    });
 
    this.loading.present();
 
  }

  getProfile(): void
  {
    this.profileProvider.getProfiles()
    .subscribe( res => {
      if (res['success'] === true) {
        this.loading.dismiss();
        if (Array.isArray(res['data'])) {
          this.profiles = res['data'];
          console.log(this.profiles); 
        }
      }
    },
    err => {
      this.translateService.get(err).subscribe((value) => {
        this.ListProfileErrorString = value;
      });
      let toast = this.toastCtrl.create({
        message: this.ListProfileErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.loading.dismiss();
    });

  }

  public openModal(){
    var data = { message : 'hello world' };
    var modalPage = this.modalCtrl.create('EditProfilePage',data);
    modalPage.present();

  }
  
  getProfileByProfileId(id): void {
    this.profileProvider.getProfileByProfileId(id).subscribe(
      res => {
        if (res['success'] === true) {
          this.profile = this.extractDataForEdition(res['data']);
        } 
      },
      err => {
        this.translateService.get(err).subscribe((value) => {
          this.ListProfileErrorString = value;
        });
        let toast = this.toastCtrl.create({
          message: this.ListProfileErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.loading.dismiss();
      }
    );
  }

  extractDataForEdition(res: any): any {
    const profile = new Profile();
    profile.profileRole = res['profileRole'];
    return profile;
  }

  presentConfirm(profile) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Etes-vous sûr de supprimer cet profile rôle '+ profile.profileRole,
      buttons: [
        {
          text: 'Supprimer',
          handler: () => {
            this.delete(profile);
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

  addprofile() {
    this.navCtrl.push('AddProfilePage');
  }

  showProfileDetails(profile: any){
    this.navCtrl.push('EditProfilePage', {
      profile : profile
    });   
   }

}
