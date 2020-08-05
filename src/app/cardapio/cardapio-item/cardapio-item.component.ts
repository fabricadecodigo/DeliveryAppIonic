import { Component, Input } from '@angular/core';
import { ICardapioProduct } from './../shared/icardapio';

@Component({
  selector: 'app-cardapio-item',
  templateUrl: './cardapio-item.component.html',
  styleUrls: ['./cardapio-item.component.scss'],
})
export class CardapioItemComponent {
  @Input()
  product: ICardapioProduct;

  constructor() { }
}
