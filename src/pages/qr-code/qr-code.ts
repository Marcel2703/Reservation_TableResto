import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRCodeModule } from 'angular2-qrcode';
import { ToastService } from '../../providers';

/**
 * Generated class for the QrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-qr-code',
  templateUrl: 'qr-code.html',
})
export class QrCodePage {
  private created_code= null;
  private qr_data = {
  "reservationCode": "",
  "dateReservation": "",
  "guestNumber": "",
  "lastnameClient": "",
  "listeTable": "",
  "motifDescription": "",
  "pseudo": ""
}

constructor(public navCtrl: NavController,public toastCtrl: ToastService) { }


/** 
*  Method to issue QR Code
*/
createCode() {
  this.qr_data.reservationCode = 'hsynterkr';
  this.qr_data.dateReservation = 'USD';
  this.qr_data.guestNumber = '25';
  this.qr_data.lastnameClient = 'hsynterkr';
  this.qr_data.listeTable = 'USD';
  this.qr_data.motifDescription = '25';
  this.qr_data.pseudo = 'hsynterkr';
  this.created_code = JSON.stringify(this.qr_data);
}
ionViewDidLoad() {
  this.createCode();
}

telecharger() {

  this.toastCtrl.create('QR CODE BIEN TELECHARGER');
  this.navCtrl.push('TabsClientPage');
}

annuler() {

  this.toastCtrl.create("Annuler par l'utilisateur");
  this.navCtrl.push('TabsClientPage');
}

}
