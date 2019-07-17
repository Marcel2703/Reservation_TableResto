import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {TableProvider} from "../../providers/table/table";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Table } from '../../models/table';

/**
 * Generated class for the ListTablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-table',
  templateUrl: 'list-table.html',
})
export class ListTablePage {
  tables: Array<any>;
  loadingList = false;
  loading: any;
  errors = [];
  table = new Table();

  // Our translated text strings
  private ListTableErrorString: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public tableProvider: TableProvider,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.showLoader(); 
    this.tableProvider.getTables()
    .subscribe( res => {
      if (res['success'] === true) {
        this.loading.dismiss();
        if (Array.isArray(res['data'])) {
          this.tables = res['data'];
          console.log(this.tables); 
        }
      }
    },
    err => {
      this.loadingList = false;
      this.translateService.get(err).subscribe((value) => {
        this.ListTableErrorString = value;
      });
      let toast = this.toastCtrl.create({
        message: this.ListTableErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.loading.dismiss();
    });
  }

  delete(table):void
  {
    this.tableProvider.deleteTable(table).subscribe(
      res => {
        if (res['success'] === true)
        {
          this.translateService.get(res['message']).subscribe((value) => {
            this.ListTableErrorString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.ListTableErrorString,
            duration: 3000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
            this.listTable();
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
          this.ListTableErrorString = value;
        });
        let toast = this.toastCtrl.create({
          message: this.ListTableErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );
  }

  listTable() {
    this.navCtrl.push('ListTablePage');
  }

  presentConfirm(table) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Etes-vous sûr de supprimer cet table '+ table.tableCode,
      buttons: [
        {
          text: 'Supprimer',
          handler: () => {
            this.delete(table);
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

  addtable() {
    this.navCtrl.push('AddTablePage');
  }

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: "loading table page..."
    });
 
    this.loading.present();
 
  }

  showTableDetails(table: any){
    this.navCtrl.push('EditTablePage', {
      table : table
    });   
   }

}
