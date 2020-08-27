import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { ToastService } from './../../core/services/toast.service';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class OpenCloseGuard implements CanActivate {

  constructor(
    private restaurantService: RestaurantService,
    private toastService: ToastService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.restaurantService.get().then(result => {
      if (!result.open) {
        this.toastService.showWarning('O restaurante está fechado no momento. Com isso não é possível efetuar pedidos.');
      }

      return result.open;
    });
  }
}
