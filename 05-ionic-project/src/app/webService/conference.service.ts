import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  constructor(private httpClient: HttpClient) { }
  
}
