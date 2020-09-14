import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ToastService } from './../../core/services/toast.service';
import { IRestaurantResponse } from './../../restaurants/shared/irestaurant-response';
import { RestaurantService } from './../../restaurants/shared/restaurant.service';
import { AddressService } from './../../users/shared/address.service';
import { IAddressResponse } from './../../users/shared/iaddress-response';
import { DeliveryPlaceType } from './../shared/delivery-place-type.enum';
import { IDeliveryModel } from './../shared/idelivery-model';
import { ShoppingCartService } from './../shared/shopping-cart.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit, OnDestroy {

  deliveryModel: IDeliveryModel = {
    deliveryPlaceType: DeliveryPlaceType.delivery,
    addressId: '',
    selectedAddress: null
  };

  deliveryPlaceTypeEnum = DeliveryPlaceType;

  restaurant: IRestaurantResponse = {};
  addresses: IAddressResponse[] = [];

  subtotal$: Observable<number>;
  total$: Observable<number>;
  deliveryValue$: Observable<number>;
  deliveryFree$: Observable<boolean>;
  cartWarning: Subscription;
  disablePaymentButton$: Observable<boolean>;

  constructor(
    private restaurantService: RestaurantService,
    private addressService: AddressService,
    private shoppingCartService: ShoppingCartService,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subtotal$ = this.shoppingCartService.subtotalResult;
    this.total$ = this.shoppingCartService.totalResult;
    this.deliveryValue$ = this.shoppingCartService.deliveryValueResult;
    this.deliveryFree$ = this.shoppingCartService.deliveryFreeResult;
    this.cartWarning = this.shoppingCartService.warningResult.subscribe(message => {
      if (message) {
        this.toast.showWarning(message);
      }
    });
    this.disablePaymentButton$ = this.shoppingCartService.stopCheckout;

    this.loadRestaurant();
    this.loadAddresses();
  }

  ngOnDestroy() {
    this.cartWarning.unsubscribe();
  }

  async loadRestaurant() {
    this.restaurant = await this.restaurantService.get();
  }

  async loadAddresses() {
    this.addresses = await this.addressService.getAllByUser();
    if (this.addresses.length > 0) {
      this.deliveryModel.addressId = this.addresses[0]._id;
      this.deliveryModel.selectedAddress = this.addresses[0];
      this.calculateTotal();
    }
  }

  getRestaurantAddressText() {
    return this.addressService.getAddressText(
      this.restaurant.stret,
      this.restaurant.number,
      this.restaurant.complement,
      this.restaurant.neighborhood);
  }

  getAddressText(address: IAddressResponse) {
    return this.addressService.getAddressText(
      address.street,
      address.number,
      address.complement,
      address.neighborhood);
  }

  calculateTotal() {
    this.shoppingCartService.calculateDelivery(this.restaurant, this.deliveryModel);
  }

  onDeliveryPlaceChange() {
    if (this.deliveryModel.deliveryPlaceType === DeliveryPlaceType.delivery) {
      if (this.deliveryModel.selectedAddress) {
        this.calculateTotal();
      }
    } else {
      this.deliveryModel.addressId = '';
      this.deliveryModel.selectedAddress = null;
      this.calculateTotal();
    }
  }

  onAdressChange() {
    this.deliveryModel.selectedAddress = this.addresses.find(a => a._id === this.deliveryModel.addressId);
    this.calculateTotal();
  }

  onPaymentButtonClick() {
    this.shoppingCartService.calculateDelivery(this.restaurant, this.deliveryModel);
    this.router.navigate(['/tabs/checkout/payment']);
  }
}
