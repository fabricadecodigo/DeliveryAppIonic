import { IShoppingCartModel } from './ishopping-cart-model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { nextTick } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private items: IShoppingCartModel[] = [];
  private total = 0;

  itemResult = new BehaviorSubject(this.items);
  totalResult = new BehaviorSubject(this.total);

  constructor() {
    const result = localStorage.getItem('shopping-cart');
    if (result) {
      this.items = JSON.parse(result);
    }
    this.updateValues();
  }

  get(id: number) {
    return this.items.find(i => i.id === id);
  }

  add(item: IShoppingCartModel) {
    item.id = this.items.length + 1;
    this.items.push(item);
    this.save();
  }

  update(item: IShoppingCartModel) {
    const result = this.get(item.id);
    result.quantity = item.quantity;
    result.note = item.note;

    this.save();
  }

  remove(item: IShoppingCartModel) {
    const index = this.items.findIndex(i => i.id === item.id);
    this.items.splice(index, 1);
    this.save();
  }

  private save() {
    const result = JSON.stringify(this.items);
    localStorage.setItem('shopping-cart', result);
    this.updateValues();
  }

  private updateValues() {
    this.itemResult.next(this.items);

    this.total = this.calculateTotal();

    this.totalResult.next(this.total);
  }

  private calculateTotal() {
    let total = 0;

    if (this.items.length > 0) {
      total = this.items
        .map(item => item.product.price * item.quantity)
        .reduce((previusItem, nextItem) => previusItem + nextItem);
    }

    return total;
  }
}
