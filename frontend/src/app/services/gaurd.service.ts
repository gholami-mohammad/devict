import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GaurdService implements CanActivate, CanActivateChild{

  constructor( private authService: UserAuthService, private router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.authenticatedUser && this.authService.authenticatedUser.email) {
      return true;
    }

    return this.authService.whoami().pipe(
      tap(res => {
        this.authService.authenticatedUser = res;
      }),
      map(val => {
        return true;
      }),
      catchError((err, caught) => {
        this.router.navigate(['login']);
        return EMPTY;
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.authenticatedUser && this.authService.authenticatedUser.email) {
      return true;
    }

    return this.authService.whoami().pipe(
      tap(res => {
        this.authService.authenticatedUser = res;
      }),
      map(val => {
        return true;
      }),
      catchError((err, caught) => {
        this.router.navigate(['login']);
        return EMPTY;
      })
    );
  }
}
