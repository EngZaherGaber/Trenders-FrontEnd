import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trender } from 'src/app/Interfaces/trender';
import { MaterialModule } from '../../Material/Material.module';

@Component({
  selector: 'app-trender-card-institutaion',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './trender-card-institutaion.component.html',
  styleUrls: ['./trender-card-institutaion.component.scss']
})
export class TrenderCardInstitutaionComponent {
  @Input('trender') trender: Trender;
}
