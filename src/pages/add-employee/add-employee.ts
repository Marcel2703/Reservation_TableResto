import { Component, ViewChild, ElementRef, Input, Renderer } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,NavParams, ViewController, Slides, App, Platform, LoadingController, ActionSheetController } from 'ionic-angular';
import {EmployeeProvider} from "../../providers/employee/employee";
import {LoginValidator} from "../../providers/validator/login/login.validator";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from "../../models/employee";
import {FormUtilsService} from "../../providers/shared/form-utils.service";
import { Camera } from '@ionic-native/camera';
import {ProfileProvider} from "../../providers/profile/profile";
import { CameraProvider } from '../../providers/camera/camera';



/**
 * Generated class for the AddEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-employee',
  templateUrl: 'add-employee.html',
})
export class AddEmployeePage {

  @ViewChild('fileInput') fileInput;
   // Slider methods
   @ViewChild('innerSlider') innerSlider: Slides;
   chosenPicture: any;
 
  activeTab = 0;
  forms: Array<FormGroup>;
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  employee = new Employee();
  errors = [];
  loading = false;
  showErrors: Array<boolean>;
  isEdition = false;
  profiles: Array<any>;
 

  // Our translated text strings
  private AddEmployeeErrorString: string;
  private AddEmployeeMessageString: string;
  private ListProfileErrorString: string;

  constructor(
    public navParams: NavParams,
    public employeeProvider: EmployeeProvider,
    private formService: FormUtilsService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public actionsheetCtrl: ActionSheetController,
    public cameraProvider: CameraProvider,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public renderer: Renderer,
    public app: App,
    public profileProvider: ProfileProvider
    ) {

      this.slideOneForm = this.fb.group({
        'photoPath': [''],
        'lastname': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
        'firstname': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
        'profileId': ['', Validators.required]
        
       
       });
    
       this.slideTwoForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
       'adress': ['', Validators.required],
      'phoneNumber':  ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}|[0-9]{10}|\+33 [0-9]{1} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}|\+33[0-9]{9}$/)])],
      // 'phoneNumber' : ['', Validators.required],
       // tslint:disable-next-line:max-line-length
       'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
                        
       'password': ['', Validators.required],
       'confirmPassword': ['', Validators.compose([Validators.required, LoginValidator.matchOtherValidator('password')])]
            
        
          });
    
        this.forms = [this.slideOneForm, this.slideTwoForm];
        this.showErrors = [false, false];
  }

  ionViewDidLoad() {
    this.getProfile();
  }

  save(): void{
    switch (this.isEdition) {
      case true: this.updateEmployee(); break;
      case false: this.addEmployee(); break;
    }
  }

  addEmployee(): void {
    if(this.slideTwoForm.valid)
    {
      
      this.employeeProvider.addEmployee(this.employee).subscribe(
        
        res => {
          this.resetForm();
          if (res['success'] === true) {
            this.translateService.get(res['message']).subscribe((value) => {
              this.AddEmployeeMessageString = value;
            });
            let toast = this.toastCtrl.create({
              message: this.AddEmployeeMessageString,
              duration: 3000,
              position: 'top'
            });
            
            toast.onDidDismiss(() => {
              this.listEmployee();
            });
          
            toast.present();
          } else {
            this.errors = res['errors'];
          }
        },
        err => {
          this.translateService.get(err).subscribe((value) => {
            this.AddEmployeeErrorString = value;
          });
          let toast = this.toastCtrl.create({
            message: this.AddEmployeeErrorString,
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

  updateEmployee(): void {

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
  next(){
       
  }

  creerNouvEmployee(): void {
    this.employee = new Employee();
    this.resetForm();
    this.showErrors = [false, false];
    this.errors = [];
    this.activeTab = 0;

  }

 
  getProfileImageStyle() {
    return 'url(' + this.slideOneForm.controls['photoPath'].value + ')'
  }

  getProfile(): void
  {
    this.profileProvider.getProfiles()
    .subscribe( res => {
      if (res['success'] === true) {
        if (Array.isArray(res['data'])) {
          this.profiles = res['data'];
          console.log(this.profiles); 
        }
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
    });

  }
  

  resetForm(): void {
    this.forms.forEach(form => {
      this.formService.markAsPristine(form);
    });
  }
  
 

  listEmployee() {
    this.navCtrl.push('WelcomePage');
  }

  hasError(field: string): boolean {
    return this.formService.hasError(field, this.errors);
  }

  getError(field: string): string {
    return this.formService.getError(field, this.errors);
  }



  changePicture() {

    const actionsheet = this.actionsheetCtrl.create({
      title: 'upload picture',
      buttons: [
        {
          text: 'camera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: !this.platform.is('ios') ? 'gallery' : 'camera roll',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.getPicture();
          }
        },
        {
          text: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    return actionsheet.present();
  }

  takePicture() {
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraProvider.getPictureFromCamera().then(picture => {
      if (picture) {
        this.chosenPicture = picture;
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }

  getPicture() {
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        this.chosenPicture = picture;
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }


processWebImage(event) {
  let reader = new FileReader();
  reader.onload = (readerEvent) => {

    let imageData = (readerEvent.target as any).result;
    this.slideOneForm.patchValue({ 'photoPath': imageData });
  };

  reader.readAsDataURL(event.target.files[0]);
}

}