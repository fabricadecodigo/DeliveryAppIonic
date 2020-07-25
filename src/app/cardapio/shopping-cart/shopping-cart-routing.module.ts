import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingCartPage } from './shopping-cart.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartPageRoutingModule {}
