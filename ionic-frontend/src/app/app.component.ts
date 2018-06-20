import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AuthService } from "./../services/auth.service";

import { Pages } from "../models/enums/pages.enum";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Pages.Home;

  pages: Array<{ title: string; component: string }>;

  constructor(
    public auth: AuthService,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Perfil", component: Pages.Profile },
      { title: "Categorias", component: Pages.Categorias },
      { title: "Carrinho", component: Pages.Cart },
      { title: "Logout", component: "" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: { title: string; component: string }) {
    switch (page.title) {
      case "Logout":
        this.auth.logout();
        this.nav.setRoot(Pages.Home);
        break;
      default:
        this.nav.setRoot(page.component);
        break;
    }
  }
}
