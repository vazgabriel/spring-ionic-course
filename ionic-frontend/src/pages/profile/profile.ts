import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { API_CONFIG } from './../../config/api.config';

import { ClienteDTO } from './../../models/cliente.dto';
import { Pages } from './../../models/enums/pages.enum';

import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public camera: Camera,
    public clienteService: ClienteService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService
  ) {
  }

  ionViewDidLoad(): void {
    this.loadData();
  }

  loadData(): void {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
        }, error => {
          if (error.status == 403) {
            this.navCtrl.setRoot(Pages.Home);
          }
        });
    } else {
      this.navCtrl.setRoot(Pages.Home);
    }
  }

  getImageIfExists(): void {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      }, error => {});
  }

  getCameraPicture(): void {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
      .then(imageData => {
        this.picture = `data:image/png;base64,${imageData}`;
        this.cameraOn = false;
      }, err => {
        console.log("err ", err);
      });
  }

  sendPicture(): void {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {

        this.picture;
        this.loadData();

      }, err => {});
  }

}
