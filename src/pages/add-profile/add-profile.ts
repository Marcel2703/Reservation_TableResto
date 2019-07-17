import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,NavParams, LoadingController, AlertController } from 'ionic-angular';
import {ProfileProvider} from "../../providers/profile/profile";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from "../../models/profile";
import {FormUtilsService} from "../../providers/shared/form-utils.service";

/**
 * Generated class for the AddProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-profile',
  templateUrl: 'add-profile.html',
})
export class AddProfilePage  {
  form: FormGroup;
  profile = new Profile();
  errors = [];
  loading: any;
  loadingAdd = false;
  logoChanged = false;
  isUpdate = false;
  currentUrl: string;
  showErrors = false;
  typesNiveauAcces = [
    { value: 1, display: 'Niveau 1'},
    { value: 2, display: 'Niveau 2'}
  ];


   // Our translated text strings
   private AddProfileErrorString: string;
   private AddProfileMessageString: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileProvider: ProfileProvider,
    private formService: FormUtilsService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private loadingCtrl: LoadingController,
     private alertCtrl: AlertController) { 

      this.form = this.fb.group({
        'profileRole': ['', Validators.required],
        'niveauAccess': ['', Validators.required]

      });
      /*this.form.valueChanges
.subscribe(data => this.onValueChanged(data));
this.onValueChanged();*/
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProfilePage');
  }

  addProfile(): void {
    if (this.form.valid)
    {
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
    else
    {
      this.showErrors = true;
    }
    
  }
/*
  validationMessages = {
    'profileRole': {
    'required': 'Email is required.'
    }
    };

  formErrors = {
    'profileRole': ''
    };

  onValueChanged(data?: any) {
    if (!this.form) {
    return;
    }
    const form = this.form;
    for (const field in this.formErrors) {
    // clear previous error message (if any)
    this.formErrors[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
    const messages = this.validationMessages[field];
    for (const key in control.errors) {
    this.formErrors[field] += messages[key] + ' ';
    }
    }
    }
    }
    */

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
      content: "Add..."
    });
 
    this.loading.present();
 
  }

}
