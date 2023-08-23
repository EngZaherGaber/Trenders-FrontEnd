import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent {

}
