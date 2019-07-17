import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import '../providers/shared/rxjs/rxjs-operator';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PersistenceModule } from 'angular-persistence';



import { Items } from '../mocks/providers/items';
import { Settings, User, Api, Persistance, ToastService, AlertService } from '../providers';
import { MyApp } from './app.component';
import { ProfileProvider } from '../providers/profile/profile';
import {FormUtilsService} from "../providers/shared/form-utils.service";
import { LoginCountRestoEmployeeProvider } from '../providers/login-count-resto-employee/login-count-resto-employee';
import { EmployeeProvider } from '../providers/employee/employee';
import { MotifProvider } from '../providers/motif/motif';
import { TableProvider } from '../providers/table/table';
import { LanguageProvider } from '../providers/language/language';
import { ClientProvider } from '../providers/client/client';
import { ReservationProvider } from '../providers/reservation/reservation';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { CameraProvider } from '../providers/camera/camera';
import { UtilisateurProvider } from '../providers/utilisateur/utilisateur';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { RservationProvider } from '../providers/rservation/rservation';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    SuperTabsModule.forRoot(),
    PersistenceModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
   
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProfileProvider,
    FormUtilsService,
    ToastService,
    Persistance,
    AlertService,
    LoginCountRestoEmployeeProvider,
    EmployeeProvider,
    MotifProvider,
    TableProvider,
    LanguageProvider,
    ClientProvider,
    ReservationProvider,
    BarcodeScanner,
    InterceptorProvider,
    CameraProvider,
    UtilisateurProvider,
    RservationProvider,
    ReservationProvider
  ]
})
export class AppModule { }
