import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendersService } from 'src/app/Services/trenders.service';
import { TrenderCardComponent } from '../trender-card/trender-card.component';
import { MaterialModule } from '../../Material/Material.module';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Interfaces/category';
import { CategoriesService } from 'src/app/Services/categories.service';
import { CountriesService } from 'src/app/Services/countries.service';

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [CommonModule, TrenderCardComponent, MaterialModule],
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent {

  Trenders: any[];

  constructor(private trenderSrv: TrendersService, private categoriesSrv: CategoriesService, private countrySrv: CountriesService) { }
  Lcategories$: Observable<Category[]>;
  Lcities$: Observable<string[]>;
  ngOnInit() {
    this.Lcategories$ = this.categoriesSrv.getAllCategories();
    console.log(this.Lcategories$)
    this.Lcities$ = this.countrySrv.getAllCities('Syria');
    this.Trenders = this.trenderSrv.getTenders();
  }

  Search() {

  }
}
