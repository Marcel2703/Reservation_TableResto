import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';

@Component({
  template: ` <!--Side Menu with avatar-->
  <ion-menu [content]="content" id="menu-avatar">
    <ion-content>
      <div #header>
        <ion-row style="align-items:center;">
          <ion-col col-3>
            <img src="../assets/icon/icon-email.svg" />
            <span class="icon-badge">4</span>
          </ion-col>
          <ion-col col-6>
            <img class="user-avatar round" [src]="chosenPicture || placeholder" onerror="this.src='../assets/img/avatar/girl-avatar.png'"
            />
          </ion-col>
          <ion-col col-3>
            <img src="../assets/icon/icon-calendar.svg" />
          </ion-col>
        </ion-row>
        <ion-row style="justify-content: center;">
          <h3>Rotsy Marcella</h3>
        </ion-row>
      </div>
      <ion-list no-lines>
        <button menuClose ion-item detail-none *ngFor="let p of pages" (click)="openPage(p)">
          <!--<ion-icon [name]="p.icon" item-left></ion-icon>-->
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>
  </ion-menu>
  <!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;


  
  pages: any[] = [
    { title: 'Liste Reservation', component: 'TabsReservationPage' },
    { title: 'Liste Client', component: 'ListClientPage' },
    { title: 'Liste Employée', component: 'ListEmployeePage' },
    { title: 'Liste profile', component: 'ListProfilePage' },
    { title: 'Liste Motif', component: 'ListMotifPage' },
    { title: 'Liste Table', component: 'ListTablePage' },
    { title: 'List Langage', component: 'ListLanguagePage' },
    { title: 'Scanner QR CODE', component: 'BarcodeScannerPage' },
    { title: 'Parametres', component: 'SettingsPage' },
    { title: 'Deconnexion', component: 'MenuPage' }
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
