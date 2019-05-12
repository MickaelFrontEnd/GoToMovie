import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import UserService from './user.service';
import { Injectable } from '@angular/core';

@Injectable()
export default class FrontGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.userService.isAuthentified()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
