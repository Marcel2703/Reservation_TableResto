import { Component } from '@angular/core';
import { NavController, ModalController, ModalOptions, IonicPage } from "ionic-angular";


/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor( public navCtrl: NavController,
    public modalCtrl: ModalController) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  listprofile() {
    this.navCtrl.setRoot('QrCodePage');
  }


register() {
  this.navCtrl.setRoot('AddEmployeePage');
  }

  registe() {
    this.navCtrl.setRoot('AddClientPage');
    }


  listreservation() {
    this.navCtrl.push('MenuEmployeePage');
  }

  addprofile() {
    this.navCtrl.push('AddProfilePage');
  }

  logEmployee() {
    this.navCtrl.push('LoginCountEmployeeRestoPage');
  }

  showLoginModal() {
    const modalOptions: ModalOptions = {
      cssClass: "signInModal"
    };
    const modal = this.modalCtrl.create("LoginCountEmployeeRestoPage", {}, modalOptions);
    modal.present();
  }
}
