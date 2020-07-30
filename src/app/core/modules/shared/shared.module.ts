import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardapioItemComponent } from './../../../cardapio/cardapio-item/cardapio-item.component';
import { ShoppingCartItemComponent } from './../../../checkout/shopping-cart-item/shopping-cart-item.component';
import { ShoppingCartTotalComponent } from './../../../checkout/shopping-cart-total/shopping-cart-total.component';

@NgModule({
  declarations: [
    CardapioItemComponent,
    ShoppingCartItemComponent,
    ShoppingCartTotalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardapioItemComponent,
    ShoppingCartItemComponent,
    ShoppingCartTotalComponent
  ]
})
export class SharedModule { }
