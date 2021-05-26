import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Speaker } from '../models/speaker';

interface SpeakerData {
  [key: string ]: Speaker
}

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  baseUrl :string = "https://devfest-nantes-2018-api.cleverapps.io/speakers"

  private speakersCache: Speaker[];

  constructor(private http : HttpClient) { }

  getSpeakers(): Observable<Speaker[]>{
    if (this.speakersCache) {
      return of(this.speakersCache);
    } else {
      return this.http.get<SpeakerData>(this.baseUrl).pipe(
        map((speakerData: SpeakerData) => {
          const speakers: Speaker[] = [];
          for (let key in speakerData) {
            speakers.push(speakerData[key]);
          }
          return speakers;
        }),
        tap(speakers => this.speakersCache = speakers)
      );
    }
  }
}
