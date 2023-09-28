import { Component, Renderer2, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendersService } from 'src/app/Services/trenders.service';
import { TrenderCardComponent } from '../trender-card/trender-card.component';
import { MaterialModule } from '../../Material/Material.module';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/Interfaces/category';
import { CategoriesService } from 'src/app/Services/categories.service';
import { CountriesService } from 'src/app/Services/countries.service';
import { Trender } from 'src/app/Interfaces/trender';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TrenderCardComponent, MaterialModule],
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent {

  trenders$: Observable<Trender[]>;

  Lcategories$: Observable<Category[]>;
  Lcities$: Observable<string[]>;
  constructor(private renderer: Renderer2, private trenderSrv: TrendersService, private categoriesSrv: CategoriesService, private countrySrv: CountriesService) { }
  ngOnInit() {
    this.Lcategories$ = this.categoriesSrv.getAllCategories();
    console.log(this.Lcategories$)
    this.Lcities$ = this.countrySrv.getAllCities('Syria');
    this.trenders$ = this.trenderSrv.getTenders();
  }

  Search() {

  }
}
