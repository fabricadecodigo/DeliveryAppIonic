import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../../core/modules/shared/shared.module';
import { CardapioItemFormPageRoutingModule } from './cardapio-item-form-routing.module';
import { CardapioItemFormPage } from './cardapio-item-form.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    CardapioItemFormPageRoutingModule
  ],
  declarations: [CardapioItemFormPage]
})
export class CardapioItemFormPageModule {}
