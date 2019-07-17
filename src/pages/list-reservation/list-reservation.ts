import { Component, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {ReservationProvider} from "../../providers/reservation/reservation";
import { IonicPage, NavController, ToastController,NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { Reservation } from '../../models/reservation';

/**
 * Generated class for the ListReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-reservation',
  templateUrl: 'list-reservation.html',
})
export class ListReservationPage {

  reservations: Array<any>;
  loading: any;
  reservation = new Reservation();
// Our translated text strings
private ListReservationErrorString: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private loadingCtrl: LoadingController,
    public modalCtrl : ModalController,
    public alertCtrl: AlertController,
    public reservationProvider: ReservationProvider,
    private ngZone: NgZone) {
  }

  ionViewDidLoad() {
    //this.showLoader(); 
  this.getReservation();
  }

  
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: "chargement liste reservation..."
    });
 
    this.loading.present();
 
  }

  getReservation(): void
  {
    this.showLoader(); 
    this.reservationProvider.getReservations()
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
