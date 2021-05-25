import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Conferences', url: '/folder/Conference', icon: 'today' },
    { title: 'Session', url: '/folder/Session', icon: 'easel' },
    { title: 'Presentateur', url: '/folder/Presentateur', icon: 'person' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
