import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ClienteDTO } from "../../models/cliente.dto";

import { API_CONFIG } from "../../config/api.config";

import { ImageUtilService } from "./../image-util.service";
import { StorageService } from "./../storage.service";

@Injectable()
export class ClienteService {
  constructor(
    public http: HttpClient,
    public imageUtil: ImageUtilService,
    public storage: StorageService
  ) {}

  findById(id: string): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  findByEmail(email: string): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }

  insert(obj: ClienteDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj, {
      observe: "response",
      responseType: "text"
    });
  }

  uploadPicture(picture: string) {
    const pictureBlob = this.imageUtil.dataUriToBlob(picture);

    let formData: FormData = new FormData();
    formData.set("file", pictureBlob, "file.png");

    return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`, formData, {
      observe: "response",
      responseType: "text"
    });
  }
}
