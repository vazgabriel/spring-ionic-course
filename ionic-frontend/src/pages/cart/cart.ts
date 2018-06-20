import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { API_CONFIG } from "../../config/api.config";

import { CartItem } from "./../../models/cartItem";
import { Pages } from './../../models/enums/pages.enum';
import { ProdutoDTO } from './../../models/produto.dto';

import { CartService } from './../../services/cart.service';
import { ProdutoService } from './../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls(): void {
    for (let index = 0; index < this.items.length; index++) {
      let item = this.items[index];

      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        }, error => {});
    }
  }

  removeItem(produto: ProdutoDTO): void {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO): void {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO): void {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn(): void {
    this.navCtrl.setRoot(Pages.Categorias);
  }

  checkout(): void {
    this.navCtrl.setRoot(Pages.PickAddress);
  }

}
