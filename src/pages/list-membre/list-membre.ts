import { Component} from '@angular/core';
import { IonicPage, NavController, ToastController,NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {EmployeeProvider} from "../../providers/employee/employee";

/**
 * Generated class for the ListMembrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-membre',
  templateUrl: 'list-membre.html',
})
export class ListMembrePage {
  employees: Array<any>;
  loadingList = false;
  loading: any;

   // Our translated text strings
   private ListEmployeeErrorString: string;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
    public employeeProvider: EmployeeProvider,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
  }

  
  delete(item) {
    alert('Deleted ');
  }

  viewComments(item) {
    alert('Viewing comments of ');
  }

  viewPlayers(item) {
    alert('Viewing players of ');
  }

  ionViewDidLoad() {
    this.showLoader(); 
  this.getEmployee();
  }

  getEmployee(): void
  {
    this.employeeProvider.getMembre()
    .subscribe( res => {
      if (res['success'] === true) {
        this.loading.dismiss();
        if (Array.isArray(res['data'])) {
          this.employees = res['data'];
          console.log(this.employees); 
        }
      }
    },
    err => {
      this.translateService.get(err).subscribe((value) => {
        this.ListEmployeeErrorString = value;
      });
      let toast = this.toastCtrl.create({
        message: this.ListEmployeeErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.loading.dismiss();
    });

  }

  
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: "chargement liste employée..."
    });
 
    this.loading.present();
 
  }

  showEmployeeDetails(employee: any){
    this.navCtrl.push('EmployeeDetailsPage', {
      employee : employee
    });   
   }

}
