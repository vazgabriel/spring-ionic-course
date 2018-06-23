import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { AuthService } from '../services/auth.service';
import { CartService } from './../services/cart.service';
import { CategoriaService } from './../services/domain/categoria.service';
import { ClienteService } from './../services/domain/cliente.service';
import { ImageUtilService } from './../services/image-util.service';
import { ProdutoService } from './../services/domain/produto.service';
import { StorageService } from './../services/storage.service';

import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
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
    // Interceptors (ordered by priority)
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    // Services (ordered alphabetically)
    AuthService,
    CartService,
    CategoriaService,
    ClienteService,
    ImageUtilService,
    ProdutoService,
    SplashScreen,
    StatusBar,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
