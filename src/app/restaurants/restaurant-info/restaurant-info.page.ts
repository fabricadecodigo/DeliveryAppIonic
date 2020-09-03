import { Component, OnInit } from '@angular/core';
import { AddressService } from './../../users/shared/address.service';
import { IRestaurantResponse } from './../shared/irestaurant-response';
import { RestaurantService } from './../shared/restaurant.service';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.page.html',
  styleUrls: ['./restaurant-info.page.scss'],
})
export class RestaurantInfoPage implements OnInit {

  restaurant: IRestaurantResponse = {};



  constructor(
    private restaurantService: RestaurantService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.loadRestaurant();
  }

  async loadRestaurant() {
    const result = await this.restaurantService.get();
    if (result) {
      this.restaurant = result;
    }
  }

  getAddressText() {
    return this.addressService.getAddressText(
      this.restaurant.stret,
      this.restaurant.number,
      this.restaurant.complement,
      this.restaurant.neighborhood);
  }

  getDayOfWeekName(value: number) {
    return this.restaurantService.getDayOfWeekName(value);
  }
}
