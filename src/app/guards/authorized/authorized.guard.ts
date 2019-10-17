import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise( async (resolve, reject) => {
      console.log('In Authorized canActivate');
      const canAct = await this.auth.inRoleNotObservable(next.data.expectedRoles);

      if (!canAct) {
        alert('Your account does not have adequate permissions.');
        return resolve(false);
      }
      else {
        return resolve (true) ;
      }
    });
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise( async (resolve, reject) => {
      console.log('In Authorized canActivateChild');
      const canAct = await this.auth.inRoleNotObservable(next.data.expectedRoles);

      if (!canAct) {
        alert('Your account does not have adequate permissions.');
        return resolve(false);
      } else {
        return resolve (true) ;
      }
    });
  }
  /*
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
   */
}
