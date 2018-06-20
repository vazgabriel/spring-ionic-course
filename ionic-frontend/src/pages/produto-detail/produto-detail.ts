import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { API_CONFIG } from './../../config/api.config';

import { Pages } from './../../models/enums/pages.enum';
import { ProdutoDTO } from './../../models/produto.dto';

import { CartService } from './../../services/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {
  item: ProdutoDTO;

  constructor(
    public cartService: CartService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService
  ) {
  }

  ionViewDidLoad() {
    let produtoId = this.navParams.get('produtoId');

    if (!produtoId) {
      this.navCtrl.pop();
    }

    this.produtoService.findById(produtoId)
      .subscribe((response: ProdutoDTO) => {
        this.item = response;
        this.getImageIfExists();
      }, error => {});

  }

  getImageIfExists(): void {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      }, error => {});
  }

  addToCart(produto: ProdutoDTO): void {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot(Pages.Cart);
  }

}
