import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardapioItemComponent } from './../../../cardapio/cardapio-item/cardapio-item.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    CardapioItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardapioItemComponent
  ]
})
export class SharedModule { }
