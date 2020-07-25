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
            path: 'shopping-cart',
            loadChildren: () => import('../cardapio/shopping-cart/shopping-cart.module')
              .then(m => m.ShoppingCartPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
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
