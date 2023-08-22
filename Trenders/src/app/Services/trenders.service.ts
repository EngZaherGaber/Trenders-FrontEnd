import { Injectable } from '@angular/core';
import { Trender } from '../Interfaces/trender';

@Injectable({
  providedIn: 'root'
})
export class TrendersService {

  Tenders: Trender[] = [
    {
      id: 1, title: 'Electronic Trender', description: 'Pla pla', institute: {
        id: 1, name: 'Elec', address: 'Damascus', created_at: '12/12/2022', categories: [{ id: 1, name: 'electronics' }], img: './\assets/\photo_2023-04-25_02-47-35.jpg'
      }, details: [], img: ''
    },
    {
      id: 2, title: 'Electronic Trender', description: 'Pla pla', institute: {
        id: 1, name: 'Elec', address: 'Damascus', created_at: '12/12/2022', categories: [{ id: 1, name: 'electronics' }], img: './\assets/\photo_2023-04-25_02-47-35.jpg'
      }, details: [], img: ''
    }
  ]

  constructor() { }

  getTenders() {
    if (this.Tenders.length > 0) {
      return this.Tenders;
    }
    else {
      return null;
    }
  }
}
