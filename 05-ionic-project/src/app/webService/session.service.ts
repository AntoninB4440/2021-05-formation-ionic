import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  baseUrl : string = 'https://devfest-nantes-2018-api.cleverapps.io/sessions'

  constructor(private httpClient: HttpClient) { }
  
  getAll() {
    return this.httpClient.get(this.baseUrl);
  }
}
