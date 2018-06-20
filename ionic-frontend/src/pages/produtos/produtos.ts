import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Loading
} from "ionic-angular";

import { API_CONFIG } from "./../../config/api.config";

import { Pages } from "./../../models/enums/pages.enum";
import { ProdutoDTO } from "../../models/produto.dto";

import { ProdutoService } from "./../../services/domain/produto.service";

@IonicPage()
@Component({
  selector: "page-produtos",
  templateUrl: "produtos.html"
})
export class ProdutosPage {
  items: ProdutoDTO[];

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService
  ) {}

  ionViewDidLoad() {
    let categoriaId = this.navParams.get("categoriaId");

    if (!categoriaId) {
      this.navCtrl.pop();
    }

    let loader: Loading = this.presentLoading();

    this.produtoService.findByCategoria(categoriaId).subscribe(
      (response: any) => {
        this.items = response.content || [];
        this.loadImageUrls();
        loader.dismiss();
      },
      error => {}
    );
  }

  loadImageUrls(): void {
    for (let index = 0; index < this.items.length; index++) {
      let item = this.items[index];

      this.produtoService.getSmallImageFromBucket(item.id).subscribe(
        response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${
            item.id
          }-small.jpg`;
        },
        error => {}
      );
    }
  }

  showDetail(produtoId: string): void {
    this.navCtrl.push(Pages.ProdutoDetail, {
      produtoId
    });
  }

  private presentLoading(): Loading {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    return loader;
  }
}
