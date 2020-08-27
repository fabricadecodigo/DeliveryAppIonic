import { OpenCloseGuard } from './../restaurants/shared/open-close.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../core/guard/auth.guard';

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
            path: 'new/:productId',
            loadChildren: () => import('../cardapio/cardapio-item-form/cardapio-item-form.module')
              .then(m => m.CardapioItemFormPageModule),
            canActivate: [AuthGuard, OpenCloseGuard]
          },
          {
            path: 'edit/:productId/:itemId',
            loadChildren: () => import('../cardapio/cardapio-item-form/cardapio-item-form.module')
              .then(m => m.CardapioItemFormPageModule),
            canActivate: [AuthGuard, OpenCloseGuard]
          }
        ]
      },
      {
        path: 'checkout',
        canActivate: [AuthGuard, OpenCloseGuard],
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
          .then(m => m.OrderListPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'restaurant',
        loadChildren: () => import('../restaurants/restaurant-info/restaurant-info.module')
          .then(m => m.RestaurantInfoPageModule)
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('../users/user-info/user-info.module')
              .then(m => m.UserInfoPageModule),
          },
          {
            path: 'personal-info',
            loadChildren: () => import('../users/personal-info/personal-info.module').then(m => m.PersonalInfoPageModule)
          },
          {
            path: 'change-password',
            loadChildren: () => import('../users/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
          }
        ]
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
