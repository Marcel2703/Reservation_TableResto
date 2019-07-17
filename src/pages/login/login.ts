import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,NavParams, AlertController } from 'ionic-angular';
import {LoginCountRestoEmployeeProvider} from "../../providers/login-count-resto-employee/login-count-resto-employee";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginEmployeeResto } from "../../models/loginEmployeeResto";
import { Storage } from '@ionic/storage';
import { Persistance } from '../../providers';
import { PersistenceService, StorageType } from 'angular-persistence';
import { JwtHelper } from 'angular2-jwt';
import { EmployeeProvider } from '../../providers/employee/employee';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  form: FormGroup;
  userLogin = new LoginEmployeeResto();
  jwtHelper = new JwtHelper();
  public employee:any;
  
   // Our translated text strings
   private LoginErrorString: string;
   AddLoginMessageString


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     private loginEmployeeService: LoginCountRestoEmployeeProvider,
     private fb: FormBuilder,
     public toastCtrl: ToastController,
     private employeeService: EmployeeProvider,
     public translateService: TranslateService,
     public persistenceService:PersistenceService,
     public persistenceServic:Persistance,
     private storage: Storage) {

    this.form = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });

  }

  login(): void {
    this.loginEmployeeService.loginClient(this.userLogin).subscribe(
      res => {
        if (res['success'] === true) {
          /*this.storage.set('token', 'Bearer ' + res['data']['token']);*/
          this.persistenceServic.setCurrentuser(res['data']);
          this.translateService.get(res['message']).subscribe((value) => {
            this.AddLoginMessageString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.AddLoginMessageString,
            duration: 3000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
            this.loginSuccess();
          });
        
          toast.present();
        } else {
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

 showAlert(err) {
  let alert = this.alertCtrl.create({
    title: "Error!",
    subTitle: err,
    buttons: ["OK"]
  });
  alert.present();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginCountEmployeeRestoPage');
  }

  mdpOublie() {
    this.navCtrl.setRoot('ForgottenPasswordPage');
  }

  loginSuccess()
  {
    var token = this.persistenceServic.getCurrentUser();
    console.log(token);
    this.navCtrl.setRoot('TabsClientPage'); 

  }
}
