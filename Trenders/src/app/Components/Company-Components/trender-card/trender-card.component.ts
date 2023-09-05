import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';
import { Trender } from '../../../Interfaces/trender';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trender-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './trender-card.component.html',
  styleUrls: ['./trender-card.component.scss']
})
export class TrenderCardComponent {
  constructor(private router: Router) { }
  @Input('trender') trender: Trender;
  addOffer() {
    this.router.navigate(['/add-offer', this.trender.id]);
  }
}
