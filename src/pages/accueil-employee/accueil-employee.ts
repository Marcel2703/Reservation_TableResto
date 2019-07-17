import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav,  MenuController} from 'ionic-angular';

interface PageItem {
  title: string
  component: any
}
type PageList = PageItem[]


/**
 * Generated class for the AccueilEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accueil-employee',
  templateUrl: 'accueil-employee.html',
})
export class AccueilEmployeePage {
 // A reference to the ion-nav in our component
 @ViewChild(Nav) nav: Nav;

 pages: PageList;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController) {
      this.pages = [
        { title: 'Sign in', component: 'LoginPage' },
        { title: 'Signup', component: 'SignupPage' }
      ];
 
  }

  openPage(page: PageItem) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ionViewDidLoad() {
    console.log('Hello AccueilEmployéePage Page');
  }

  // Only enables right side menu for this page. Testing purposes.
  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menu-right');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'menu-right');
  }

  register() {
    this.navCtrl.setRoot('ListProfilePage');
    }
  
    registe() {
      this.navCtrl.setRoot('TabsReservationPage');
      }
  
}
