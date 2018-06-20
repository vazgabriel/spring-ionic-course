import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { PedidoDTO } from "./../../models/pedido.dto";
import { EnderecoDTO } from "./../../models/endereco.dto";
import { Pages } from "./../../models/enums/pages.enum";

import { CartService } from "./../../services/cart.service";
import { ClienteService } from "../../services/domain/cliente.service";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-pick-address",
  templateUrl: "pick-address.html"
})
export class PickAddressPage {
  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public cartService: CartService,
    public clienteService: ClienteService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService
  ) {}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        (response: any) => {
          this.items = response.enderecos;

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response.id },
            enderecoDeEntrega: null,
            itens: cart.items.map(item => ({
              quantidade: item.quantidade,
              produto: {
                id: item.produto.id
              }
            })),
            pagamento: null
          };
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot(Pages.Home);
          }
        }
      );
    } else {
      this.navCtrl.setRoot(Pages.Home);
    }
  }

  nextPage(endereco: EnderecoDTO): void {
    this.pedido.enderecoDeEntrega = { id: endereco.id };
    this.navCtrl.push(Pages.Payment, {
      pedido: this.pedido
    });
  }
}
