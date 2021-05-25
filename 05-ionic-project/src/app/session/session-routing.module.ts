import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionComponent } from './session.component';

const routes: Routes = [
  {
    path: '',
    component: SessionComponent,
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('../session-details/session-details-routing.module').then( m => m.SessionDetailsRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
