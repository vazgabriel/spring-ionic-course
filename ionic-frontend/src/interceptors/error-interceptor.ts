import { AlertController } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

import { FieldMessage } from './../models/fieldMessage';

import { StorageService } from './../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService, public alertCtrl: AlertController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {

        let errorObj = error;

        if (errorObj.error) {
          errorObj = errorObj.error;
        }

        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }

        console.log('Error detectado pelo interceptor ', errorObj);

        switch (errorObj.status) {
          case 403:
            this.handle403();
            break;

          case 422:
            this.handle422(errorObj);
            break;

          default:
            this.handleDefaultErrors(errorObj);
            break;
        }

        return Observable.throw(errorObj);
      }) as any;
  }

  handleDefaultErrors(errorObj: any): void {
    this.alertCtrl.create({
      title: `Erro ${errorObj.status}: ${errorObj.error}`,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    }).present();
  }

  handle403(): void {
    this.storage.setLocalUser(null);
  }

  handle422(errorObj: any): void {
    this.alertCtrl.create({
      title: `Erro ${errorObj.status}: ${errorObj.error}`,
      message: this.listErrors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    }).present();
  }

  listErrors(errors: FieldMessage[]): string {
    let s: string = '';

    for (let i = 0; i < errors.length; i++) {
      s += `
        <p>
          <strong>${errors[i].fieldName}</strong>:
          ${errors[i].message}
        </p>
      `;
    }

    return s;
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
