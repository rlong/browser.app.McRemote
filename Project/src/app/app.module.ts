import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import {TestPageModule} from "../pages/test/test.module";
// import {ClipboardPageModule} from "../pages/clipboard/clipboard.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    // ClipboardPageModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TestPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
  ]
})
export class AppModule {}
