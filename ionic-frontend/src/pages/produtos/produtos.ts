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
  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(): void {
    let categoriaId = this.navParams.get("categoriaId");

    if (!categoriaId) {
      this.navCtrl.pop();
    }

    let loader: Loading = this.presentLoading();

    this.produtoService.findByCategoria(categoriaId, this.page, 10).subscribe(
      (response: any) => {
        const start = this.items.length;

        if (response.content && response.content.length > 0) {
          this.items.concat(response.content);
        }

        const end = (this.items.length - 1);
        this.loadImageUrls(start, end);
        loader.dismiss();
      },
      error => {}
    );
  }

  loadImageUrls(start: number, end: number): void {
    for (let index = start; index <= end; index++) {
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

  doRefresh(refresher): void {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

  doInfinite(infiniteScroll): void {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }
}
