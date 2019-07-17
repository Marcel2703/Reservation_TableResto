import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {ReservationProvider} from "../../providers/reservation/reservation";
import { TranslateService } from '@ngx-translate/core';
import { Reservation } from '../../models/reservation';

/**
 * Generated class for the ListReservationWaitingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-reservation-waiting',
  templateUrl: 'list-reservation-waiting.html',
})
export class ListReservationWaitingPage {
  reservations: Array<any>;
  loading: any;
  reservation = new Reservation();

// Our translated text strings
private ListReservationErrorString: string;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,
    public translateService: TranslateService,
    private loadingCtrl: LoadingController,
     public navParams: NavParams,public reservationProvider: ReservationProvider) {
  }

  ionViewDidLoad() {
    this.getWaitingReservation();
  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: "chargement liste reservation..."
    });
 
    this.loading.present();
 
  }

  getWaitingReservation(): void
  {
    this.showLoader(); 
    this.reservationProvider.getWaitingReservations()
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

  CancelReservation(reservation):void
  {
    this.reservationProvider.CancelReservation(reservation).subscribe(
      res => {
        if (res['success'] === true)
        {
          this.translateService.get(res['message']).subscribe((value) => {
            this.ListReservationErrorString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.ListReservationErrorString,
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
      }
    );
  }

  listprofile() {
    this.navCtrl.push('TabsReservationPage');
  }

  ValidReservation(reservation):void
  {
    this.reservationProvider.CancelReservation(reservation).subscribe(
      res => {
        if (res['success'] === true)
        {
          this.translateService.get(res['message']).subscribe((value) => {
            this.ListReservationErrorString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.ListReservationErrorString,
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
      }
    );
  }
  
}
