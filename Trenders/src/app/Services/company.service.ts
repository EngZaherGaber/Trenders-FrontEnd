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

}
