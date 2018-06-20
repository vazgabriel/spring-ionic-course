import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Pages } from './../../models/enums/pages.enum';
import { PedidoDTO } from "./../../models/pedido.dto";

@IonicPage()
@Component({
  selector: "page-payment",
  templateUrl: "payment.html"
})
export class PaymentPage {
  pedido: PedidoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.pedido = this.navParams.get("pedido");

    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, [Validators.required]],
      "@type": ["pagamentoComCartao", [Validators.required]]
    });
  }

  nextPage(): void {
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot(Pages.OrderConfirmation, {
      pedido: this.pedido
    });
  }

}
