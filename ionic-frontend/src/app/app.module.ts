import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { AuthService } from '../services/auth.service';
import { CategoriaService } from './../services/domain/categoria.service';
import { ClienteService } from './../services/domain/cliente.service';
import { StorageService } from './../services/storage.service';

import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AuthService,
    CategoriaService,
    ClienteService,
    ErrorInterceptorProvider,
    SplashScreen,
    StatusBar,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
