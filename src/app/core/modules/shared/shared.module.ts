import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardapioItemComponent } from './../../../cardapio/cardapio-item/cardapio-item.component';
import { ShoppingCartItemComponent } from './../../../checkout/shopping-cart-item/shopping-cart-item.component';
import { ShoppingCartTotalComponent } from './../../../checkout/shopping-cart-total/shopping-cart-total.component';
import { OrderInProgressListComponent } from './../../../orders/order-in-progress-list/order-in-progress-list.component';
import { OrderOldListComponent } from './../../../orders/order-old-list/order-old-list.component';

@NgModule({
  declarations: [
    CardapioItemComponent,
    ShoppingCartItemComponent,
    ShoppingCartTotalComponent,
    OrderOldListComponent,
    OrderInProgressListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardapioItemComponent,
    ShoppingCartItemComponent,
    ShoppingCartTotalComponent,
    OrderOldListComponent,
    OrderInProgressListComponent
  ]
})
export class SharedModule { }
