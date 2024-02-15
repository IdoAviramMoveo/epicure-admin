import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = (route, state): boolean => {
    if (sessionStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  };
}
