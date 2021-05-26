import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Conference', url: '/home', icon: 'mail' },
    { title: 'Session', url: '/session', icon: 'paper-plane' },
    { title: 'Speakers', url: '/speaker', icon: 'heart' },
    
  ];
  
  constructor() {}
}
