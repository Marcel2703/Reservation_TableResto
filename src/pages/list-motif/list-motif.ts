import { Component} from '@angular/core';
import { IonicPage, NavController, ToastController,NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {MotifProvider} from "../../providers/motif/motif";
import { Motif } from "../../models/motif";

/**
 * Generated class for the ListMotifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-motif',
  templateUrl: 'list-motif.html',
})
export class ListMotifPage {
  motifs: Array<any>;
  loadingList = false;
  motif = new Motif();
  errors = [];

  // Our translated text strings
    private ListMotifErrorString: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public motifProvider: MotifProvider,
    public translateService: TranslateService,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
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
      this.loadingList = false;
      this.translateService.get(err).subscribe((value) => {
        this.ListMotifErrorString = value;
      });
      let toast = this.toastCtrl.create({
        message: this.ListMotifErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();;
    });
  }

  delete(motif):void
  {
    this.motifProvider.deleteMotif(motif).subscribe(
      res => {
        if (res['success'] === true)
        {
          this.translateService.get(res['message']).subscribe((value) => {
            this.ListMotifErrorString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.ListMotifErrorString,
            duration: 3000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
            this.listmotif();
          });
        
          toast.present();
        } 
        else
        {
          if (res['ErrorsMessages'].length > 0) {
            this.errors = res['ErrorsMessages'];
          }
        }     
      },
      err => {

        this.translateService.get(err).subscribe((value) => {
          this.ListMotifErrorString = value;
        });
        let toast = this.toastCtrl.create({
          message: this.ListMotifErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );
  }
  
  listmotif() {
    this.navCtrl.push('ListMotifPage');
  }

  presentConfirm(motif) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Etes-vous sûr de supprimer cet description motif '+ motif.motifDescription,
      buttons: [
        {
          text: 'Supprimer',
          handler: () => {
            this.delete(motif);
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  addmotif() {
    this.navCtrl.push('AddMotifPage');
  }

  showMotifDetails(motif: any){
    this.navCtrl.push('EditMotifPage', {
      motif : motif
    });   
   }

}
