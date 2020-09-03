import { DeliveryPlaceType } from './delivery-place-type.enum';
import { IDeliveryModel } from './idelivery-model';
import { IRestaurantResponse } from './../../restaurants/shared/irestaurant-response';
import { IShoppingCartModel } from './ishopping-cart-model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { nextTick } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private items: IShoppingCartModel[] = [];
  private subtotal = 0;
  private deliveryValue = 0;
  private deliveryFree = false;
  private total = 0;

  itemResult = new BehaviorSubject(this.items);
  subtotalResult = new BehaviorSubject(this.subtotal);
  deliveryValueResult = new BehaviorSubject(this.deliveryValue);
  deliveryFreeResult = new BehaviorSubject(this.deliveryFree);
  totalResult = new BehaviorSubject(this.total);
  warningResult = new BehaviorSubject('');
  stopCheckout = new BehaviorSubject(false);

  delivery: IDeliveryModel = {};

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
    this.subtotal = this.calculateSubtotal();
    this.subtotalResult.next(this.subtotal);
    this.deliveryValueResult.next(this.deliveryValue);
    this.deliveryFreeResult.next(this.deliveryFree);
    this.totalResult.next(this.total);
  }

  private calculateSubtotal() {
    let total = 0;

    if (this.items.length > 0) {
      total = this.items
        .map(item => item.product.price * item.quantity)
        .reduce((previusItem, nextItem) => previusItem + nextItem);
    }

    return total;
  }

  private calculateDeliveryTax(restaurant: IRestaurantResponse, delivery: IDeliveryModel) {
    if (delivery.deliveryPlaceType === DeliveryPlaceType.restaurant) {
      this.deliveryFree = true;
      this.deliveryValue = 0;
    } else {
      const deliveryTo = restaurant.delivery.find(q => q.neighborhood === delivery.selectedAddress.neighborhood);
      if (deliveryTo) {
        if (deliveryTo.free) {
          this.deliveryFree = true;
          this.deliveryValue = 0;
        } else {
          this.deliveryFree = false;
          this.deliveryValue = deliveryTo.value;
        }
      } else {
        // se não entrega para esse endereço, exibir uma msg
        this.warningResult.next('Não entregamos para o endereço selecionado.');
        this.stopCheckout.next(true);
      }
    }
  }

  private calculateTotal() {
    if (this.deliveryFree) {
      this.total = this.subtotal;
    } else {
      this.total = this.subtotal + this.deliveryValue;
    }
  }

  calculateDelivery(restaurant: IRestaurantResponse, delivery: IDeliveryModel) {
    this.delivery = delivery;
    this.stopCheckout.next(false);
    this.calculateDeliveryTax(restaurant, delivery);
    this.calculateTotal();
    this.updateValues();
  }
}
