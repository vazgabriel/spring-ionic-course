import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { API_CONFIG } from './../../config/api.config';

import { Pages } from './../../models/enums/pages.enum';
import { CategoriaDTO } from './../../models/categoria.dto';

import { CategoriaService } from './../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  items: CategoriaDTO[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService
  ) {}

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe((response: CategoriaDTO[]) => {
        this.items = response;
        console.log("this.items ", this.items);
      }, error => {});
  }

  showProdutos(categoriaId: string): void {
    this.navCtrl.push(Pages.Produtos, {
      categoriaId
    });
  }

}
