import { Injectable } from '@angular/core';
import { UserService } from '../Services/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../Services/general.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyHomeGuardService implements CanActivate {

  constructor(private general: GeneralService, private router: Router) { }
  userType: string = 'company';
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userType === 'company') {
      return true;
    } else {
      return false;
    }
  }
}
