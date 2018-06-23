import { Component } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Camera, CameraOptions } from "@ionic-native/camera";

import { API_CONFIG } from "./../../config/api.config";

import { ClienteDTO } from "./../../models/cliente.dto";
import { Pages } from "./../../models/enums/pages.enum";

import { ClienteService } from "./../../services/domain/cliente.service";
import { StorageService } from "./../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  cliente: ClienteDTO;
  profileImage: string | SafeUrl;

  picture: string;
  cameraOn: boolean = false;

  constructor(
    public camera: Camera,
    public clienteService: ClienteService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public storage: StorageService
  ) {
    this.profileImage = "assets/imgs/avatar-blank.png";
  }

  ionViewDidLoad(): void {
    this.loadData();
  }

  loadData(): void {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
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

  getImageIfExists(): void {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(
      response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
        this.blobToDataUrl(response).then(dataUrl => {
          const str: string = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
      error => {
        this.profileImage = "assets/imgs/avatar-blank.png";
      }
    );
  }

  blobToDataUrl(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = e => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  getCameraPicture(): void {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = `data:image/png;base64,${imageData}`;
        this.cameraOn = false;
      },
      err => {
        this.cameraOn = false;
      }
    );
  }

  getGalleryPicture(): void {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = `data:image/png;base64,${imageData}`;
        this.cameraOn = false;
      },
      err => {
        this.cameraOn = false;
      }
    );
  }

  sendPicture(): void {
    this.clienteService.uploadPicture(this.picture).subscribe(
      response => {
        this.picture = null;
        this.getImageIfExists();
      },
      err => {}
    );
  }
}
