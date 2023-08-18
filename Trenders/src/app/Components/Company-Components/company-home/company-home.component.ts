import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendersService } from 'src/app/Services/trenders.service';
import { TrenderCardComponent } from '../trender-card/trender-card.component';

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [CommonModule, TrenderCardComponent],
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent {

  Trenders: any[];

  constructor(private trenderSrv: TrendersService) { }

  ngOnInit() {
    this.Trenders = this.trenderSrv.getTenders();
  }

}
