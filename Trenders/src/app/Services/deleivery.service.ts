import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Deleivery } from '../Interfaces/deleivery';
import { startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleiveryService {
  deleiveryList: Deleivery[] = [];
  constructor(private usrSrv: UserService) { }
  addDeleivery(name: string, description: string, categories: string[], userId: number) {
    let id: number;
    if (this.deleiveryList) {
      id = this.deleiveryList.length
    } else {
      id = 0;
    }
    const deleivery: Deleivery = {
      id: id,
      name: name,
      description: description,
      user: this.usrSrv.getUserById(userId),
    }
    this.deleiveryList.push(deleivery);
  }
}
