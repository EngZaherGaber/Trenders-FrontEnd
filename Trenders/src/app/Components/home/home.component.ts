import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyHomeComponent } from '../Company-Components/company-home/company-home.component';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../Material/Material.module';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
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
  mobileQuery: MediaQueryList;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  private _mobileQueryListener: () => void;
  constructor(private observer: BreakpointObserver,
    private usrSrv: UserService,
    private router: Router,
    private generalSrv: GeneralService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    if (this.userType === 'company') {
      // this.router.navigate(['home/company'])
      this.home = 'company';
    }
    else {
      // this.router.navigate(['home/institute'])
      this.home = 'institute';
    }
  }
  // ngAfterViewInit() {

  //   this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
  //     if (res.matches) {
  //       debugger
  //       this.sidenav.mode = "over";
  //       this.sidenav.close();
  //     } else {
  //       debugger
  //       this.sidenav.mode = "side";
  //       this.sidenav.open();
  //     }
  //   });
  // }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logOut() {
    this.usrSrv.logOut();
  }
}
