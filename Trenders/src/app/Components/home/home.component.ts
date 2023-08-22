import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyHomeComponent } from '../Company-Components/company-home/company-home.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../Material/Material.module';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CompanyHomeComponent, MaterialModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  home: string = '';
  userType: string = 'company';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver) { }
  ngOnInit() {
    if (this.userType === 'company') {
      this.home = 'company';
    }
  }
  ngAfterViewInit() {

    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }
}
