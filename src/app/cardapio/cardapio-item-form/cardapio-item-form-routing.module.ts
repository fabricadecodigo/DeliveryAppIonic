import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardapioItemFormPage } from './cardapio-item-form.page';

const routes: Routes = [
  {
    path: '',
    component: CardapioItemFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardapioItemFormPageRoutingModule {}
