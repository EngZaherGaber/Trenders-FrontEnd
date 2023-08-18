import { Injectable } from '@angular/core';
import { Trender } from '../Interfaces/trender';

@Injectable({
  providedIn: 'root'
})
export class TrendersService {

  Tenders: Trender[] = [
    { id: 1, title: 'Electronic Trender', description: 'Pla pla', institute: null, details: [], img: '' }
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
