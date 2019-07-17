import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,NavParams, AlertController } from 'ionic-angular';
import {LoginCountRestoEmployeeProvider} from "../../providers/login-count-resto-employee/login-count-resto-employee";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ForgottenPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotten-password',
  templateUrl: 'forgotten-password.html',
})
export class ForgottenPasswordPage {
  recoveryForm: FormGroup;
  email: string;
  showError = false;

 // Our translated text strings
 private LoginErrorString: string;
 private SendRecoveryMessageString: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private loginEmployeeService: LoginCountRestoEmployeeProvider,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.recoveryForm = this.fb.group({
      'email': ['', Validators.required],
    });
  }

  sendLink(): void {
    this.loginEmployeeService.sendRecovery(this.email).subscribe(
      res => {
        if (res['success'] === true) {
          this.showError = false;
          this.translateService.get(res['message']).subscribe((value) => {
            this.SendRecoveryMessageString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.SendRecoveryMessageString,
            duration: 3000,
            position: 'top'
          });
        
          toast.present();
        } else {
          this.showError = true;
          if (res['ErrorsMessages'].length > 0) {
            this.translateService.get(res['ErrorsMessages']).subscribe((value) => {
              this.LoginErrorString = value;
            });
            let toast = this.toastCtrl.create({
              message:  this.LoginErrorString,
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
        }
      },
      err => {
        this.translateService.get(err).subscribe((value) => {
          this.LoginErrorString = value;
        });
        let toast = this.toastCtrl.create({
          message:  this.LoginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgottenPasswordPage');
  }

}
