import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cardapio',
        children: [
          {
            path: '',
            loadChildren: () => import('../cardapio/cardapio-list/cardapio-list.module')
              .then(m => m.CardapioListPageModule),
          },
          {
            path: 'new',
            loadChildren: () => import('../cardapio/cardapio-item-form/cardapio-item-form.module')
              .then(m => m.CardapioItemFormPageModule)
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('../cardapio/cardapio-item-form/cardapio-item-form.module')
              .then(m => m.CardapioItemFormPageModule)
          }
        ]
      },
      {
        path: 'checkout',
        children: [
          {
            path: '',
            redirectTo: '/tabs/cardapio',
            pathMatch: 'full'
          },
          {
            path: 'shopping-cart',
            loadChildren: () => import('../checkout/shopping-cart/shopping-cart.module')
              .then(m => m.ShoppingCartPageModule)
          },
          {
            path: 'delivery',
            loadChildren: () => import('../checkout/delivery/delivery.module')
              .then(m => m.DeliveryPageModule)
          },
          {
            path: 'payment',
            loadChildren: () => import('../checkout/payment/payment.module').then(m => m.PaymentPageModule)
          }
        ]
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/order-list/order-list.module')
          .then(m => m.OrderListPageModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('../restaurants/restaurant-info/restaurant-info.module')
          .then(m => m.RestaurantInfoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/cardapio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/cardapio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
