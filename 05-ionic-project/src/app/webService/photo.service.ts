import { Injectable } from '@angular/core';
import { Camera, Photo, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoBis } from '../models/photo';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  /* public photos: PhotoBis[] = []; */

  constructor(private storageService : StorageService) { }

  async addNewToGallery(keySession : string) {
    //take photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    })

    const photos: PhotoBis[] = await this.loadSaved(keySession);
    
    const savedImageFile = await this.savePicture(capturedPhoto);

    photos.unshift(savedImageFile);

    this.storageService.set('photo_'+keySession, JSON.stringify(photos));
  }

  async savePicture(capturedPhoto: Photo) {
    return {
      filepath: capturedPhoto.base64String,
      webviewPath: capturedPhoto.webPath,
    }
  }

  async loadSaved(keySession: string) {
    const photoList = await this.storageService.get("photo_" + keySession);
    if (photoList) {
      return JSON.parse(photoList)
    } else {
      return []
    }
  }
}
