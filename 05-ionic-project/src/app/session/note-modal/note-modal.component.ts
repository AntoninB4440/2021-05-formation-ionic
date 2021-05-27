import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoBis } from 'src/app/models/photo';
import { PhotoService } from 'src/app/webService/photo.service';
import { StorageService } from 'src/app/webService/storage.service';


@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss'],
})
export class NoteModalComponent implements OnInit {

  note: string | null = "";
  photos: PhotoBis[] = [];

  @Input() id: string ;

  constructor(private modalController : ModalController, private storageService : StorageService, public photoService : PhotoService) { }

  ngOnInit() {
    this.getNotes();
    this.loadPhotoToGallery();
   }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  saveNotes() {
    this.storageService.set(this.id, this.note);
    this.dismiss();
  }

  async getNotes() {
    this.note = await this.storageService.get(this.id);
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery(this.id);
    await this.loadPhotoToGallery();
    console.log(this.photos);
    
  }

  async loadPhotoToGallery() {
    this.photos = await this.photoService.loadSaved(this.id);
  }

}
