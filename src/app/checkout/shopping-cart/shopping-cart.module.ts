import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../../core/modules/shared/shared.module';
import { ShoppingCartPageRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartPage } from './shopping-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ShoppingCartPageRoutingModule
  ],
  declarations: [ShoppingCartPage]
})
export class ShoppingCartPageModule {}
