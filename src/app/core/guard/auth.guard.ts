import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../../users/shared/auth.service';
import { ToastService } from './../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private toast: ToastService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isUserLoggedIn()) {
      return true;
    } else {
      this.toast.showError('Para acessar essa tela, é necessário efetuar seu login.');
      this.router.navigate(['login']);
      return false;
    }
  }
}
