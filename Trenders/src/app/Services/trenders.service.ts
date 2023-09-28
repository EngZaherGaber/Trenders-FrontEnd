import { Injectable } from '@angular/core';
import { Trender } from '../Interfaces/trender';
import { GeneralService } from './general.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject, catchError, concatMap, exhaustMap, filter, forkJoin, from, map, mergeMap, of, shareReplay, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendersService {
  url: string;
  trenderSubject: ReplaySubject<Trender[]> = new ReplaySubject<Trender[]>(2);
  // Tenders: Trender[] = [
  //   {
  //     id: 1, title: 'Electronic Trender', description: 'Pla pla', institute: {
  //       id: 1, name: 'Elec', address: 'Damascus', created_at: '12/12/2022', categories: [{ id: 1, name: 'electronics' }], img: './\assets/\photo_2023-04-25_02-47-35.jpg'
  //     }, details: [], img: ''
  //   },
  //   {
  //     id: 2, title: 'Electronic Trender', description: 'Pla pla', institute: {
  //       id: 1, name: 'Elec', address: 'Damascus', created_at: '12/12/2022', categories: [{ id: 1, name: 'electronics' }], img: './\assets/\photo_2023-04-25_02-47-35.jpg'
  //     }, details: [], img: ''
  //   }
  // ]

  constructor(private general: GeneralService, private http: HttpClient) {
    this.url = general.getUrl();

  }

  getTenders(search: string, categories: number[], cities: string[]): Observable<Trender[]> {
    const url = this.url + 'trender';
    let params = new HttpParams().set('q', search);

    categories.forEach(category => {
      params = params.append('category_ids[]', category.toString());
    });
    cities.forEach(city => {
      params = params.append('cities[]', city.toString());
    })
    return this.http.get<Trender[]>(url, { params: params }).pipe(
      catchError((error) => {
        return of(null);
      }),
      map(res => res as Trender[]),
      shareReplay(1)
    )
  }

  getTrender(id): Observable<any> {
    const url = this.url + 'trender/' + id;
    return this.http.get(url).pipe(
      catchError((error) => {
        throw error
      }),
      // map((x: any) => x.data)
    )
  }
}
// exhaustMap((trenders: Trender[]) => {
//   // Create an observable sequence that processes each trender one at a time
//   return from(trenders).pipe(
//     concatMap((trender) => this.getTrender(trender.id).pipe(catchError(err => {

//       console.log('err')
//       return of(null)
//     }),)),

//     filter(result => result !== null),
//     toArray() // Collect the results back into an array
//   );
// }),