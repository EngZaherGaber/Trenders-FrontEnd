import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../Interfaces/user';
import { PhoneNumber } from 'libphonenumber-js';
import { Company } from '../Interfaces/company';
import { Customer } from '../Interfaces/customer';
import { Bank } from '../Interfaces/bank';
import { Deleivery } from '../Interfaces/deleivery';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggingUser: User ;
  userList: User[] = [
    {
      id: 0,
      username: 'zaher.japr',
      email: 'zaher@gmail.com',
      password: '123456789',
      role: 'admin',
      city: 'damascus',
      country: 'syria',
      currency: 'SYR',
      phoneNumber: '+963993258672'
    }
  ];
  deleiveryList: Deleivery[] = [];
  constructor() {

  }
  getUsers() {
    return this.userList;
  }
  getUser(inp_text: string): User {
    if (inp_text.includes('@')) {
      const user = this.getUsers().find(x => x.email === inp_text);
      if (user) {
        return user;
      }
      else {
        return undefined;
      }
    }
    else {
      const user = this.getUsers().find(x => x.username === inp_text);
      if (user) {
        return user;
      }
      else {
        return undefined;
      }
    }
  }
  getUserById(id: number): User {
    if (this.userList.length >= id) {

      return this.userList[id];
    }
    else {
      return undefined
    }
  }
  checkPassword(user: User, password: string): boolean {
    if (user.password === password) {
      return true;
    } else {
      return false;
    }
  }
  addUser(username: string, password: string, email: string, role: string, city: string, country: string, currency: string, phonenumber: string) {
    let id: number;
    if (this.userList) {
      id = this.userList.length
    } else {
      id = 0;
    }
    const user: User = {
      id: id,
      username: username,
      email: email,
      password: password,
      role: role,
      city: city,
      country: country,
      currency: currency,
      phoneNumber: phonenumber
    };
    this.userList.push(user);
  }
  deleteUser(id: number) {
    this.userList.splice(id, 1);
  }
  isLoggedIn() {
    if (this.loggingUser) {
      return true;
    }
    else {
      return false;
    }
  }
  logOut() {
    this.loggingUser = undefined;
  }
}
