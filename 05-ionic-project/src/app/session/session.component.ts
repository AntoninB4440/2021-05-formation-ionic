import { Component, OnInit } from '@angular/core';
import { SessionService } from '../webService/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  sessions: any = [];

  constructor(private sessionService : SessionService) { }

  ngOnInit(): void {
    this.populateSession();
    console.log(this.sessions);
  }

  populateSession() {
    this.sessionService.getAll().subscribe(res => {
      for (const key in res) {
        this.sessions.push(res[key]);
      }
    })
  }

}
