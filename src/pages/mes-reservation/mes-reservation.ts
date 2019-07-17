import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController, ModalOptions } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {ReservationProvider} from "../../providers/reservation/reservation";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Reservation } from '../../models/reservation';
import { Persistance } from '../../providers';
import { PersistenceService, StorageType } from 'angular-persistence';
import { JwtHelper } from 'angular2-jwt';
import { EmployeeProvider } from '../../providers/employee/employee';

/**
 * Generated class for the MesReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mes-reservation',
  templateUrl: 'mes-reservation.html',
})
export class MesReservationPage {
  jwtHelper = new JwtHelper();
  public Mesreservation:Array<any>;
  public employee:any;
  reservationt = new Reservation();

  // Our translated text strings
  private ListProfileErrorString: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private reservation: ReservationProvider,
    private employeeService: EmployeeProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public persistenceService:PersistenceService,
    public persistenceServic:Persistance,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.getMesReservation()
  }

  getMesReservation(): void
  {
    var token = this.persistenceServic.getCurrentUser();
      this.reservation.getReservationByClient(token.id).subscribe( res => {
      if (res['success'] === true) {

          this.Mesreservation = res['data'];
          console.log(this.Mesreservation); 

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
    }) ;
    

  } 

  CancelReservation(reservationt):void
  {
    this.reservation.CancelReservation(reservationt).subscribe(
      res => {
        if (res['success'] === true)
        {
          this.translateService.get(res['message']).subscribe((value) => {
            this.ListProfileErrorString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.ListProfileErrorString,
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
          this.ListProfileErrorString = value;
        });
        let toast = this.toastCtrl.create({
          message: this.ListProfileErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );
  }

  listprofile() {
    this.navCtrl.push('TabsClientPage');
  }

  addprofile() {
    this.navCtrl.push('AddReservationPage');
  }

  showLoginModal() {
    const modalOptions: ModalOptions = {
      cssClass: "signInModal"
    };
    const modal = this.modalCtrl.create("QrCodePage", {}, modalOptions);
    modal.present();
  }

}
