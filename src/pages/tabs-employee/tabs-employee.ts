import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the TabsEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-employee',
  templateUrl: 'tabs-employee.html',
})
export class TabsEmployeePage {

  pages = [
    { pageName: 'ListEmployeePage', title: 'Liste employées', icon: 'list-box', id: 'aboutTab'},
    { pageName: 'ListNoMembrePage', title: 'Nouveaux', icon: 'hand', id: 'newsTab'},  
    { pageName: 'ListMembrePage', title: 'Membres', icon: 'checkmark-circle', id: 'accountTab'}
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
