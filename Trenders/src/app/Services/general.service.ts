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
    sessionStorage.setItem('Token', token);
  }
  getToken() {
    if (!this.token) {
      this.token = sessionStorage.getItem('Token');
    }
    return this.token;
  }
}
