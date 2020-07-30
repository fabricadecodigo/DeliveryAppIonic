import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../../core/modules/shared/shared.module';
import { OrderListPageRoutingModule } from './order-list-routing.module';
import { OrderListPage } from './order-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OrderListPageRoutingModule
  ],
  declarations: [OrderListPage]
})
export class OrderListPageModule {}
