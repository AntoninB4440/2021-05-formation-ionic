import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpeakerPageRoutingModule } from './speaker-routing.module';

import { SpeakerPage } from './speaker.page';
import { SpeakerDetailComponent } from './speaker-detail/speaker-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakerPageRoutingModule
  ],
  declarations: [SpeakerPage, SpeakerDetailComponent]
})
export class SpeakerPageModule {}
