import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the TabsReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-reservation',
  templateUrl: 'tabs-reservation.html',
})
export class TabsReservationPage {

  pages = [
    { pageName: 'ListReservationWaitingPage', title: 'En Attente', icon: 'hand', id: 'aboutTab'},
    { pageName: 'ListReservationPage', title: 'Tous', icon: 'list-box', id: 'newsTab'},  
    { pageName: 'ListReservationAcceptePage', title: 'Accepté', icon: 'checkmark-circle', id: 'accountTab'}
  ];
 
  selectedTab = 0;
 
  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsReservationPage');
  }

  onTabSelect(ev: any) {  
      this.selectedTab = ev.index;   
  }
}
