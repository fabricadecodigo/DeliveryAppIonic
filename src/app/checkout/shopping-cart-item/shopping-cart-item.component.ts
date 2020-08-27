import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IShoppingCartModel } from './../shared/ishopping-cart-model';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss'],
})
export class ShoppingCartItemComponent implements OnInit {

  @Input()
  item: IShoppingCartModel = {};

  @Output()
  actionButtonClicked = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onActionButtonClicked() {
    this.actionButtonClicked.emit(this.item);
  }
}
