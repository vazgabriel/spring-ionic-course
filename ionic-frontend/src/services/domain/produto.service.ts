import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { API_CONFIG } from "./../../config/api.config";

import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {
  constructor(public http: HttpClient) {}

  findByCategoria(categoriaId: string): Observable<any> {
    return this.http.get(
      `${API_CONFIG.baseUrl}/produtos/?categorias=${categoriaId}`
    );
  }

  findById(produtoId: string): Observable<ProdutoDTO> {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produtoId}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    return this.http.get(`${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`, {
      responseType: "blob"
    });
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    return this.http.get(`${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`, {
      responseType: "blob"
    });
  }
}
