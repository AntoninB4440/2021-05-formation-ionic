import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Session } from '../models/session';
import { map, tap } from 'rxjs/operators';

interface SessionData {
  [key: string ]: Session
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  baseUrl :string = "https://devfest-nantes-2018-api.cleverapps.io/sessions"

  private sessionsCache: Session[];

  constructor(private http: HttpClient) { }
  
  getSessions(): Observable<Session[]>{
    if (this.sessionsCache) {
      return of(this.sessionsCache);
      console.log();
    } else {
      return this.http.get<SessionData>(this.baseUrl).pipe(
        map((sessionData: SessionData) => {
          const sessions: Session[] = [];
          for (let key in sessionData) {
            sessions.push(sessionData[key]);
          }
          return sessions;
        }),
        tap(sessions => this.sessionsCache = sessions)
      );
    }
  }
}
