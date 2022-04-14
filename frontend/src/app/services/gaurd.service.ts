import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GaurdService implements CanActivate, CanActivateChild{

  constructor(private router: Router, private authService: UserAuthService) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.authenticatedUser && this.authService.authenticatedUser.email) {
      return true;
    } else {
      return this.router.navigate(['login']);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.authenticatedUser && this.authService.authenticatedUser.email) {
      return true;
    } else {
      return this.router.navigate(['login']);
    }
  }
}
