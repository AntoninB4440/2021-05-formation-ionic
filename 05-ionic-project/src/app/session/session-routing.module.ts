import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionDetailComponent } from './session-detail/session-detail.component';

import { SessionPage } from './session.page';

const routes: Routes = [
  {
    path: '',
    component: SessionPage
  },
  {
    path: 'detail/:id',
    component: SessionDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionPageRoutingModule {}
