import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../Interfaces/user';
import { PhoneNumber } from 'libphonenumber-js';
import { Company } from '../Interfaces/company';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggingUser: User;
  url: string;
  constructor(private general: GeneralService, private route: Router, private http: HttpClient, private _snackBar: MatSnackBar) {
    this.url = general.getUrl();
  }


  // getUserById(id: number): User {

  // }
  checkPassword(user: User, password: string): boolean {
    if (user.password === password) {
      return true;
    } else {
      return false;
    }
  }
  addUser(formdata: FormData) {
    const url = this.url + 'register';


    this.http.post(url, formdata).subscribe(res => {
      if (res['token']) {
        this.general.changeToken(res['token']);
        this._snackBar.open('Correct Register');
        this.route.navigate(['/home']);
      }

    },
      err => {
        this._snackBar.open(err['error']['message']);
      }
    )
  }
  deleteUser(id: number) {

  }
  login(email: string, password: string) {
    const url = this.url + 'login';
    const body = {
      email: email,
      password: password
    }
    this.http.post(url, body).subscribe(res => {
      if (res['token']) {
        this.general.changeToken(res['token']);
        this._snackBar.open('Correct Login');

        this.route.navigate(['/home']);
      }

    },
      err => {
        this._snackBar.open(err['error']['message']);
      }
    )
  }
  logOut() {
    this.loggingUser = undefined;
    this.general.changeToken('');
    this.route.navigate(['login'])
  }
}
