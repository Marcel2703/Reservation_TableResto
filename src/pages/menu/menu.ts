import { Component } from '@angular/core';
import { NavController, ModalController, ModalOptions, IonicPage } from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  constructor( public navCtrl: NavController,
  public modalCtrl: ModalController) { }



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
  const modal = this.modalCtrl.create("LoginPage", {}, modalOptions);
  modal.present();
}
}
