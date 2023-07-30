import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Customer } from '../Interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerList: Customer[] = [];

  constructor(private usrSrv:UserService) { }
  addCustomer(firstName: string, lastName: string, birthDate: Date, userId: number) {
    let id: number;
    if (this.customerList) {
      id = this.customerList.length
    } else {
      id = 0;
    }
    const company: Customer = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      user: this.usrSrv.getUserById(userId),
    }
    this.customerList.push(company);
  }
}
