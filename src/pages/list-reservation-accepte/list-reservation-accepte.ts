import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {ReservationProvider} from "../../providers/reservation/reservation";
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ListReservationAcceptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-reservation-accepte',
  templateUrl: 'list-reservation-accepte.html',
})
export class ListReservationAcceptePage {
  reservations: Array<any>;
  loading: any;

// Our translated text strings
private ListReservationErrorString: string;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,
    public translateService: TranslateService,
    private loadingCtrl: LoadingController,
     public navParams: NavParams,public reservationProvider: ReservationProvider) {
  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: "chargement liste reservation..."
    });
 
    this.loading.present();
 
  }

  ionViewDidLoad() {
    this.getReservationIsValid()
  }
  getReservationIsValid(): void
  {
    this.showLoader(); 
    this.reservationProvider.getReservationIsValid()
    .subscribe( res => {
      if (res['success'] === true) {
        this.loading.dismiss();
          this.reservations = res['data'];
          console.log(this.reservations); 
      }
    },
    err => {
      this.translateService.get(err).subscribe((value) => {
        this.ListReservationErrorString = value;
      });
      let toast = this.toastCtrl.create({
        message: this.ListReservationErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.loading.dismiss();
    });

  }

}
