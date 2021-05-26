import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionPageRoutingModule } from './session-routing.module';

import { SessionPage } from './session.page';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { NoteModalComponent } from './note-modal/note-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionPageRoutingModule,
  ],
  declarations: [SessionPage,SessionDetailComponent,NoteModalComponent]
})
export class SessionPageModule {}
