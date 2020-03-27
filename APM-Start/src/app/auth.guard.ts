import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthService } from './user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(redirectUrl: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    this.authService.redirectUrl = redirectUrl;
    this.router.navigate(['/login']);
    return false;
  }
  
}
