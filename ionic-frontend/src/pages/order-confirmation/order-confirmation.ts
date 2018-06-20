import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { CartItem } from "./../../models/cartItem";
import { ClienteDTO } from "./../../models/cliente.dto";
import { EnderecoDTO } from "../../models/endereco.dto";
import { Pages } from "./../../models/enums/pages.enum";
import { PedidoDTO } from "./../../models/pedido.dto";

import { CartService } from "./../../services/cart.service";
import { ClienteService } from "./../../services/domain/cliente.service";
import { PedidoService } from "./../../services/domain/pedido.service";

@IonicPage()
@Component({
  selector: "page-order-confirmation",
  templateUrl: "order-confirmation.html"
})
export class OrderConfirmationPage {
  cartItems: CartItem[];
  codPedido: string;
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  pedido: PedidoDTO;

  constructor(
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.pedido = this.navParams.get("pedido");
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id).subscribe(
      response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(
          response.enderecos,
          this.pedido.enderecoDeEntrega.id
        );
      },
      error => {
        this.navCtrl.setRoot(Pages.Home);
      }
    );
  }

  private findEndereco(list: EnderecoDTO[], id: string): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(): number {
    return this.cartService.total();
  }

  checkout() {
    this.pedidoService.insert(this.pedido).subscribe(
      response => {
        this.cartService.createOrClearCart();

        this.codPedido = this.extractId(response.headers.get("location"));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot(Pages.Home);
        }
      }
    );
  }

  back() {
    this.navCtrl.setRoot(Pages.Cart);
  }

  home() {
    this.navCtrl.setRoot(Pages.Categorias);
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring((position + 1));
  }

}
