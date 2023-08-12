import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
  URL: string = 'http://localhost:8000/api/';
  token: string = '';
  getUrl() {
    return this.URL;
  }
  changeToken(token: string) {
    this.token = token;
  }
  getToken() {
    return this.token;
  }
}
