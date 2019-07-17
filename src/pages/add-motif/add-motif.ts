import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,NavParams } from 'ionic-angular';
import {MotifProvider} from "../../providers/motif/motif";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Motif } from "../../models/motif";
import {FormUtilsService} from "../../providers/shared/form-utils.service";

/**
 * Generated class for the AddMotifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-motif',
  templateUrl: 'add-motif.html',
})
export class AddMotifPage {
  form: FormGroup;
  motif = new Motif();
  errors = [];
  loading: any;
  showErrors = false;
  // Our translated text strings
  private AddMotifErrorString: string;
  private AddMotifMessageString: string;

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public motifProvider: MotifProvider,
    private formService: FormUtilsService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

      this.form = this.fb.group({
        'motifDescription': ['', Validators.required]

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMotifPage');
  }

  addMotif(): void {
    if (this.form.valid)
    {
      this.motifProvider.addMotif(this.motif).subscribe(
        res => {
          this.formService.markAsPristine(this.form); 
          if (res['success'] === true)
          {
            this.translateService.get(res['message']).subscribe((value) => {
              this.AddMotifMessageString = value;
            });
            let toast = this.toastCtrl.create({
              message: this.AddMotifMessageString,
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
            this.AddMotifErrorString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.AddMotifErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      );

    }
    else
    {
      this.showErrors = true;
    }
    
  }

  listmotif() {
    this.navCtrl.push('ListMotifPage');
  }

  hasError(field: string): boolean {
    return this.formService.hasError(field, this.errors);
  }

  getError(field: string): string {
    return this.formService.getError(field, this.errors);
  }

}



