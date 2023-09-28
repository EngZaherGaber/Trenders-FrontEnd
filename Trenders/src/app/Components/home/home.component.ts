import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyHomeComponent } from '../Company-Components/company-home/company-home.component';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../Material/Material.module';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/Services/user.service';
import { GeneralService } from 'src/app/Services/general.service';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CompanyHomeComponent, MaterialModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  home: string = '';
  userType: string = '';
  user: User;
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
    this.usrSrv.getProfile().subscribe(res => {
      this.usrSrv.loggingUser = {
        id: res.id,
        username: res.name,
        email: res.email,
        password: null,
        isCompany: this.usrSrv.isCompany
      };
    });

  }
  ngOnInit() {
    // this.userType = this.usrSrv.isCompany ? 'company' : 'institute';
    if (this.usrSrv.loggingUser) {
      this.user = this.usrSrv.loggingUser;
      if (this.user.isCompany) {
        // this.router.navigate(['company'])
        this.home = 'company';
      }
      else {
        // this.router.navigate(['institute'])
        this.home = 'institute';
      }
    } else {
      this.usrSrv.getProfile().subscribe(res => {
        this.usrSrv.loggingUser = {
          id: res.user.id,
          username: res.user.name,
          email: res.user.email,
          password: null,
          isCompany: res.is_company
        };
        this.user = this.usrSrv.loggingUser
        this.userType = this.user.isCompany ? 'company' : 'institute';
        if (this.user.isCompany) {
          // this.router.navigate(['company'])
          this.home = 'company';
        }
        else {
          // this.router.navigate(['institute'])
          this.home = 'institute';
        }
      })
    }
  }
  // ngAfterViewInit() {

  //   this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
  //     if (res.matches) {
  //       
  //       this.sidenav.mode = "over";
  //       this.sidenav.close();
  //     } else {
  //       
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
