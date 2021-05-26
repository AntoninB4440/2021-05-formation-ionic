import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Session } from '../models/session';
import { SessionService } from './session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {

  sessions: Session[];

  msg: string;

  constructor(private sessionService : SessionService, private NavController : NavController) { }

  ngOnInit() {
    this.populateSession();   
  }

  populateSession() {
    this.sessionService.getSessions().subscribe((session: Session[]) => {
      this.sessions = session
    },
      error => {
      this.msg = "oops I did it again"
    });
  }

}
