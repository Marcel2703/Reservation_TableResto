import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,NavParams, LoadingController, AlertController, Slides } from 'ionic-angular';
import {ReservationProvider} from "../../providers/reservation/reservation";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from "../../models/reservation";
import {FormUtilsService} from "../../providers/shared/form-utils.service";
import { MotifProvider } from '../../providers/motif/motif';
import { TableProvider } from '../../providers/table/table';
import { Persistance } from '../../providers';
import { PersistenceService, StorageType } from 'angular-persistence';
import { JwtHelper } from 'angular2-jwt';
import { EmployeeProvider } from '../../providers/employee/employee';

/**
 * Generated class for the AddReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-reservation',
  templateUrl: 'add-reservation.html',
})
export class AddReservationPage {
  reservation = new Reservation();
  @ViewChild('fileInput') fileInput;
   // Slider methods
   @ViewChild('innerSlider') innerSlider: Slides;
   chosenPicture: any;
 
  activeTab = 0;
  forms: Array<FormGroup>;
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  errors = [];
  loading = false;
  showErrors: Array<boolean>;
  isEdition = false;
  motifs: Array<any>;
  tables: Array<any>;
  jwtHelper = new JwtHelper();
  public client:any;
    
  // Our translated text strings
   private AddReservationErrorString: string;
   private AddReservationMessageString: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public reservationProvider: ReservationProvider,
    private formService: FormUtilsService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public motifProvider: MotifProvider,
    public tableProvider: TableProvider,
    public persistenceService:PersistenceService,
     public persistenceServic:Persistance,
     private employeeService: EmployeeProvider) {


      this.slideOneForm = this.fb.group({
        'reservationCode': [''],
        'motifId': [''],
        'guestNumber': [''],
        'dateReservation': ['']      
       });
    
       this.slideTwoForm = this.fb.group({
       'commentary': [''],
       'listeTable':  [''],
       'listePartageClient': ['']
          });
    
        this.forms = [this.slideOneForm, this.slideTwoForm];
        this.showErrors = [false, false];
  }

  ionViewDidLoad() {
    this.getMotif();
    this.getTable();
    console.log('ionViewDidLoad AddReservationPage');
  }

  save(): void{
    switch (this.isEdition) {
      case true: this.updateReservation(); break;
      case false: this.addReservation(); break;
    }
  }

  addReservation(): void {
    if(this.slideTwoForm.valid)
    {
      var token = this.persistenceServic.getCurrentUser();
      let data = {
        id: this.reservation.id,
        reservationCode: this.reservation.reservationCode,
        dateReservation: this.reservation.dateReservation,
        guestNumber: this.reservation.guestNumber,
        commentary: this.reservation.commentary,
        clientId: token.id,
        employeeId:this.reservation.employeeId ,
        motifId: this.reservation.motifId,
        listeTable: this.reservation.listeTable,
        listePartageClient: this.reservation.listePartageClient
      }
      console.log(data); 
      this.reservationProvider.addReservation(this.reservation).subscribe(
        res => {
          this.resetForm();
          if (res['success'] === true) {
            this.translateService.get(res['message']).subscribe((value) => {
              this.AddReservationMessageString = value;
            });
            let toast = this.toastCtrl.create({
              message: this.AddReservationMessageString,
              duration: 3000,
              position: 'top'
            });
  
            toast.onDidDismiss(() => {
              this.redirectionReserservationSuccess();
            });
          
            toast.present();
          } else {
            this.errors = res['errors'];
          }
        },
        err => {
          this.translateService.get(err).subscribe((value) => {
            this.AddReservationErrorString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.AddReservationErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      );

    }
    else {
      this.showErrors[this.activeTab = 1] = true;
    }  
    
  }

  updateReservation(): void {

  }

  resetForm(): void {
    this.forms.forEach(form => {
      this.formService.markAsPristine(form);
    });
  }
  

  redirectionReserservationSuccess() {
    this.navCtrl.push('MesReservationPage');
  }


  hasError(field: string): boolean {
    return this.formService.hasError(field, this.errors);
  }

  getError(field: string): string {
    return this.formService.getError(field, this.errors);
  }

  slideNext() {
    if(this.slideOneForm.valid)
    {
      this.innerSlider.slideNext();
    }
    else {
      this.showErrors[this.activeTab] = true;
    }  
   
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
  }

  getMotif(): void
  {
    this.motifProvider.getMotifs()
    .subscribe( res => {
      if (res['success'] === true) {
        if (Array.isArray(res['data'])) {
          this.motifs = res['data'];
          console.log(this.motifs); 
        }
      }
    },
    err => {
      this.translateService.get(err).subscribe((value) => {
        this.AddReservationErrorString = value;
      });
      let toast = this.toastCtrl.create({
        message: this.AddReservationErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

  }

  getTable(): void
  {
    this.tableProvider.getTables()
    .subscribe( res => {
      if (res['success'] === true) {
        if (Array.isArray(res['data'])) {
          this.tables = res['data'];
          console.log(this.tables); 
        }
      }
    },
    err => {
      this.translateService.get(err).subscribe((value) => {
        this.AddReservationErrorString = value;
      });
      let toast = this.toastCtrl.create({
        message: this.AddReservationErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

  }
  

}
