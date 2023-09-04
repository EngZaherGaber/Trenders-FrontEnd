import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyHomeComponent } from '../Company-Components/company-home/company-home.component';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../Material/Material.module';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/Services/user.service';
import { GeneralService } from 'src/app/Services/general.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CompanyHomeComponent, MaterialModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  home: string = '';
  userType: string = 'institute';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver,
    private usrSrv: UserService,
    private router: Router,
    private generalSrv: GeneralService) { }
  ngOnInit() {
    if (this.userType === 'company') {
      this.router.navigate(['home/company'])
      this.home = 'company';
    }
    else {
      this.router.navigate(['home/institute'])
      this.home = 'institute';
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
  logOut() {
    this.usrSrv.logOut();
  }
}
