import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,NavParams } from 'ionic-angular';
import {TableProvider} from "../../providers/table/table";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from "../../models/table";
import {FormUtilsService} from "../../providers/shared/form-utils.service";
import {PlaceValidator} from "../../providers/validator/NbPlaceTable/place.valitator";

/**
 * Generated class for the AddTablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-table',
  templateUrl: 'add-table.html',
})
export class AddTablePage {
  form: FormGroup;
  table = new Table();
  errors = [];
  showErrors = false;
  // Our translated text strings
  private AddTableErrorString: string;
  private AddTableMessageString: string;

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public tableProvider: TableProvider,
    private formService: FormUtilsService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

      this.form = this.fb.group({
        'tableCode': ['', Validators.required],
        'placeNumber': ['', Validators.compose([Validators.required, PlaceValidator.isValid])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTablePage');
  }

  addTable(): void {
    if (this.form.valid)
    {
      this.tableProvider.addTable(this.table).subscribe(
        res => {
          this.formService.markAsPristine(this.form);
          if (res['success'] === true)
          {
            this.translateService.get(res['message']).subscribe((value) => {
              this.AddTableMessageString = value;
            });
            let toast = this.toastCtrl.create({
              message: this.AddTableMessageString,
              duration: 3000,
              position: 'top'
            });
  
            toast.onDidDismiss(() => {
              this.listtable();
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
            this.AddTableMessageString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.AddTableErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();;
        }
      );

    }
    else
    {
      this.showErrors = true;
    }
   
  }


  listtable() {
    this.navCtrl.push('ListTablePage');
  }

  hasError(field: string): boolean {
    return this.formService.hasError(field, this.errors);
  }

  getError(field: string): string {
    return this.formService.getError(field, this.errors);
  }

}
