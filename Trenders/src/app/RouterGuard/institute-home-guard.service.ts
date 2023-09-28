import { Injectable } from '@angular/core';
import { UserService } from '../Services/user.service';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../Services/general.service';

@Injectable({
  providedIn: 'root'
})
export class InstituteHomeGuardService implements CanActivateChild {

  constructor(private general: GeneralService, private router: Router) { }
  userType: string = 'institute';
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userType === 'institute') {
      return true;
    } else {
      return false;
    }
  }
}
