import { Component } from "@angular/core";
import { NavController, IonicPage, MenuController } from "ionic-angular";

import { Pages } from '../../models/enums/pages.enum';

import { CredenciaisDTO } from "../../models/credenciais.dto";

import { AuthService } from "../../services/auth.service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public menu: MenuController
  ) {}

  ionViewWillEnter(): void {
    this.menu.swipeEnable(false);
  }

  ionViewDidEnter(): void {
    this.authService.refreshToken()
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot(Pages.Categorias);
      }, error => {});
  }

  ionViewDidLeave(): void {
    this.menu.swipeEnable(true);
  }

  login(): void {
    this.authService.authenticate(this.creds)
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot(Pages.Categorias);
      }, error => {});
  }

  signup(): void {
    this.navCtrl.push(Pages.Signup);
  }
}
