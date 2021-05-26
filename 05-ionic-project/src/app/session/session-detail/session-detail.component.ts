import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss'],
})
export class SessionDetailComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit() { }
  
  goBack() {
    this.route.navigate(['session'])
  }

}
