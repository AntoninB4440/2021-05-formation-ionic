import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss'],
})
export class NoteModalComponent implements OnInit {

  note: string | null = "";
  @Input() id: string ;

  constructor(private modalController : ModalController, private storageService : StorageService) { }

  ngOnInit() {
    this.getNotes();
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
  }

  async getNotes() {
    this.note = await this.storageService.get(this.id);
  }

}
