import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Bank } from '../Interfaces/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  bankList: Bank[] = [];

  constructor(private usrSrv:UserService) { }
  addBank(name: string, description: string, userId: number) {
    let id: number;
    if (this.bankList) {
      id = this.bankList.length
    } else {
      id = 0;
    }
    const company: Bank = {
      id: id,
      name: name,
      description: description,
      user: this.usrSrv.getUserById(userId),
    }
    this.bankList.push(company);
  }
}
