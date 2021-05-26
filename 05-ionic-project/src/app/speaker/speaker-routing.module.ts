import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeakerDetailComponent } from './speaker-detail/speaker-detail.component';

import { SpeakerPage } from './speaker.page';

const routes: Routes = [
  {
    path: '',
    component: SpeakerPage
  },
  {
    path: '/detail/:id',
    component : SpeakerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakerPageRoutingModule {}
