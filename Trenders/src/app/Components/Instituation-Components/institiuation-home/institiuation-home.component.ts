import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';
import { TrenderCardInstitutaionComponent } from '../trender-card-institutaion/trender-card-institutaion.component';
import { Trender } from 'src/app/Interfaces/trender';
import { TrendersService } from 'src/app/Services/trenders.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-institiuation-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, TrenderCardInstitutaionComponent],
  templateUrl: './institiuation-home.component.html',
  styleUrls: ['./institiuation-home.component.scss']
})
export class InstitiuationHomeComponent {
  $trenders: Observable<Trender[]>;
  constructor(private trenderSrv: TrendersService) { }
  ngOnInit() {
    this.$trenders = this.trenderSrv.getTenders();
  }
}
