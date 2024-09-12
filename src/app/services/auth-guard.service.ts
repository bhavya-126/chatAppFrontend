import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor() { }

  router: Router = inject(Router);

  canActivate(): boolean {
    if (sessionStorage.getItem("token")) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
