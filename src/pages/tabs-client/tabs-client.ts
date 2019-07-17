import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the TabsClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-client',
  templateUrl: 'tabs-client.html',
})
export class TabsClientPage {

  pages = [
    { pageName: 'MesReservationPage', title: 'Mes réservations', icon: 'list-box', id: 'aboutTab'},
    { pageName: 'ProfilePage', title: 'Mon profile', icon: 'contact', id: 'newsTab'},  
    { pageName: 'ParametrePage', title: 'Paramètres', icon: 'construct', id: 'accountTab'}
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
