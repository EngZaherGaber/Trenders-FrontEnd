import { Injectable } from '@angular/core';
import { UserService } from '../Services/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../Services/general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private general: GeneralService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.general.getToken() !== '') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
