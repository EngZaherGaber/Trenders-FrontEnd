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
        institute:
        {
          id: 1,
          name: 'Elec',
          address: 'Damascus',
          created_at: '12/12/2022',
          categories: [{ id: 1, name: 'electronics' }],
          img: './\assets/\photo_2023-04-25_02-47-35.jpg',
        },
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
