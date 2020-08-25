import { Component, OnInit } from '@angular/core';
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
    private restaurantService: RestaurantService
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
    let address = `${this.restaurant.stret}, ${this.restaurant.number}`;
    if (this.restaurant.complement) {
      address += ` - ${this.restaurant.complement}`;
    }
    address += ` - ${this.restaurant.neighborhood}`;
    return address;
  }

  getDayOfWeekName(value: number) {
    return this.restaurantService.getDayOfWeekName(value);
  }
}
