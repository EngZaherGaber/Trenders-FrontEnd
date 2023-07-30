import { Injectable } from '@angular/core';
import { Company } from '../Interfaces/company';
import { UserService } from './user.service';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyList: Company[] = [];

  constructor(private usrSrv: UserService) { }
  addCompany(name: string, description: string, categories: string[], release_date: string, userId: number) {
    let id: number;
    if (this.companyList) {
      id = this.companyList.length
    } else {
      id = 0;
    }
    const company: Company = {
      id: id,
      name: name,
      description: description,
      categories: categories,
      release_date: release_date,
      user: this.usrSrv.getUserById(userId),
    }
    this.companyList.push(company);
  }
}
