import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Interfaces/category';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private general: GeneralService, private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {

    const url = this.general.getUrl() + 'category';
    return this.http.get(url).pipe(
      map((res: any) => {
        if (res) {
          return res as Category[] // Convert the response data to Category interface
        }
        else {
          return null;
        }
      })
    );

  }
}

