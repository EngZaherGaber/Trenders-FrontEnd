import { Injectable } from '@angular/core';
import { Offer } from '../Interfaces/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  offers: Offer[] = [
    {
      id: 0,
      company: {
        id: 10,
        name: 'lala',
        description: 'hahahah',
        release_date: '02/02/2020',
        user: null,
        categories: [{ id: 100, name: 'lalala' }]
      },
      trender:
      {
        id: 1,
        title: 'Electronic Trender',
        description: 'Pla pla',
        institution_id: 10,
        created_at: new Date('2023-09-16T07:38:16.000000Z'),
        updated_at: new Date('2023-09-16T07:38:16.000000Z'),
        ended_at: new Date('2023-09-16T07:38:16.000000Z'),
        details: [],
        img: '',
      },
      details: []
    }
  ];
  constructor() { }
  getOffersByStatus(status: string) {
    return this.offers;
  }

}
