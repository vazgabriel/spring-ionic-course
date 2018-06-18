import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { API_CONFIG } from './../../config/api.config';

import { CategoriaDTO } from './../../models/categoria.dto';

@Injectable()
export class CategoriaService {

  constructor(public http: HttpClient) {}

  public findAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }

}
