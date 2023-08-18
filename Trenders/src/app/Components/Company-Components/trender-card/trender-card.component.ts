import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';
import { Trender } from '../../../Interfaces/trender';

@Component({
  selector: 'app-trender-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './trender-card.component.html',
  styleUrls: ['./trender-card.component.scss']
})
export class TrenderCardComponent {
  @Input('trender') trender: Trender;
}
