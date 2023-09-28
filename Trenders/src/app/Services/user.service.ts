import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../Interfaces/user';
import { PhoneNumber } from 'libphonenumber-js';
import { Company } from '../Interfaces/company';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';

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
  getProfile(): Observable<any> {
    const url = this.url + 'profile';
    const $getProfile = this.http.get(url);
    return $getProfile;
  }
  addUser(formdata: FormData, type: string) {
    const url = this.url + 'register';

    this.http.post(url, formdata).pipe(

      mergeMap((res) => {
        if (res) {
          this.general.changeToken(res['token']);
          type === 'company' ? this.route.navigate(['/company']) : this.route.navigate(['/institute']);
          this._snackBar.open('Correct Register');
          return this.getProfile()
        }
        else {
          return null
        }
      }),
      catchError((error) => {
        console.log('error', error);
        return throwError('An Error')
      }) // Corrected mergeMap usage
    ).subscribe(
      (res) => {
        if (res) {

        }
      },
      (err) => {
        this._snackBar.open(err['message']);
      }
    );
  }
  deleteUser(id: number) {

  }
  login(email: string, password: string) {
    const url = this.url + 'login';
    const body = {
      email: email,
      password: password
    }
    this.http.post(url, body).pipe(

      mergeMap((res) => {
        if (res) {
          this.general.changeToken(res['token']);
          return this.getProfile()
        }
        else {
          return null
        }
      }),
      catchError((error) => {
        console.log('error', error);
        return throwError('An Error')
      }) // Corrected mergeMap usage
    ).subscribe(res => {
      if (res['token']) {
        res['type'] === 'company' ? this.route.navigate(['/company']) : this.route.navigate(['/institute']);
        this._snackBar.open('Correct Login');
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
