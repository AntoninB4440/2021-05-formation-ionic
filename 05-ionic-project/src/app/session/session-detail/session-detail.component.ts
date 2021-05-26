import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Session } from 'src/app/models/session';
import { Speaker } from 'src/app/models/speaker';
import { SpeakerService } from 'src/app/speaker/speaker.service';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss'],
})
export class SessionDetailComponent implements OnInit {

  sessionId: string;
  session: Session;
  speakers: Speaker[] = [];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private sessionService: SessionService,
    private speakerService: SpeakerService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.sessionId = this.activateRoute.snapshot.paramMap.get("id");
    this.getSession();
   }
  
  goBack() {
    this.router.navigate(['session'])
  }

  getSession(): void {
    this.sessionService.getSessions().subscribe((session: Session[]) => {
      session.forEach(data => {
        if (data.id === Number(this.sessionId)) {
          this.session = data;
          this.getSpeakers();
        }
      })
    })
  }

  getSpeakers(): void{
    if (this.session.speakers) {
      this.session?.speakers.forEach(speakerId => {
        this.speakerService.getSpeakers().subscribe((data: Speaker[]) => {
          data.forEach(speaker => {
            if (speaker.id == speakerId) {
              this.speakers.push(speaker);
              console.log(this.speakers);
            }
          })
        })
      })
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NoteModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
