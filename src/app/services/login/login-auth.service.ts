import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isLoggedIn() {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }

  setRoles = (roles: []) => {
    localStorage.setItem('roles', JSON.stringify(roles));
  };

  getRoles = () => {
    return localStorage.getItem('roles');
  };

  setToken = (jwtToken: string) => {
    localStorage.setItem('jwtToken', jwtToken);
  };

  getToken = (): string | null => {
    return localStorage.getItem('jwtToken');
  };

  clear = () => {
    localStorage.clear;
  };
}
