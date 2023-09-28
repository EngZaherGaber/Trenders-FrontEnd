import { Component, Renderer2, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendersService } from 'src/app/Services/trenders.service';
import { TrenderCardComponent } from '../trender-card/trender-card.component';
import { MaterialModule } from '../../Material/Material.module';
import { BehaviorSubject, Observable, Subscription, debounceTime, distinctUntilChanged, filter, finalize, map, mergeMap, of, startWith, switchMap } from 'rxjs';
import { Category } from 'src/app/Interfaces/category';
import { CategoriesService } from 'src/app/Services/categories.service';
import { CountriesService } from 'src/app/Services/countries.service';
import { Trender } from 'src/app/Interfaces/trender';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TrenderCardComponent, MaterialModule, ReactiveFormsModule],
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent {
  searchInput$ = new BehaviorSubject<string>('');
  categorySearch$ = new BehaviorSubject<string>('');
  citiesSearch$ = new BehaviorSubject<string>('');
  trenders$: Observable<Trender[]>;
  Lcategories$: Observable<Category[]>;
  Lcities$: Observable<string[]>;
  selectedCities: string[] = [];
  selectedCategories: number[] = [];
  username: FormControl = new FormControl('');
  showSpinner = false;
  constructor(private renderer: Renderer2, private trenderSrv: TrendersService, private categoriesSrv: CategoriesService, private countrySrv: CountriesService) { }
  ngOnInit() {
    this.Lcategories$ = this.categorySearch$.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((searchValue: string) =>
        this.categoriesSrv.getAllCategories().pipe(
          map(res => res.filter(x => x.name.includes(searchValue)))
        )
      )
    );
    this.Lcities$ = this.citiesSearch$.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((searchValue: string) =>
        this.countrySrv.getAllCities('Syria').pipe(
          map(res => res.filter(x => x.includes(searchValue)))
        )
      )
    );
    this.trenders$ = this.searchInput$.pipe(

      debounceTime(2000),
      // distinctUntilChanged(),
      switchMap((searchValue: string) => {
        debugger
        this.showSpinner = true;
        return this.trenderSrv.getTenders(searchValue, this.selectedCategories, this.selectedCities)
          .pipe(finalize(() => this.showSpinner = true))
      }
      )
    )

  }
  listCity(value) {
    const index = this.selectedCities.findIndex(x => x === value)
    if (index > -1) {
      this.selectedCities.splice(index, 1);
    }
    else {
      this.selectedCities.push(value);
    }
    debugger
    this.searchInput$.next('');
  }
  listCategories(value) {
    const index = this.selectedCategories.findIndex(x => x === value)
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    }
    else {
      this.selectedCategories.push(value);
    }
    this.searchInput$.next('');
  }
  search(event) {
    console.log(event)
  }
}
