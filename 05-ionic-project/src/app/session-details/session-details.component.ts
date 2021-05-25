import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../webService/session.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent implements OnInit {

  session: any = {};

  constructor(private sessionService : SessionService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.populateSession();
  }

  populateSession(): void{
    const sessionId = this.route.snapshot.params.id;

    this.sessionService.getAll().subscribe(res => {
      for (const key in res) {
        if (res[key].id == sessionId) {
          this.session = { ...res[key] };         
        };
      }
    })
  }

}
