import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { IBusinessHourResponse } from './ibusiness-hour-response';
import { IDeliveryResponse } from './idelivery-response';
import { IRestaurantResponse } from './irestaurant-response';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurant: IRestaurantResponse;

  DAYS_OF_WEEK = [
    { value: 0, text: 'Segunda Feira' },
    { value: 1, text: 'Terça Feira' },
    { value: 2, text: 'Quarta Feira' },
    { value: 3, text: 'Quinta Feira' },
    { value: 4, text: 'Sexta Feira' },
    { value: 5, text: 'Sábado' },
    { value: 6, text: 'Domingo' }
  ];

  constructor(
    private http: HttpClient
  ) { }

  async get() {
    if (!this.restaurant) {
      this.restaurant = await this.http.get<IRestaurantResponse>(`${environment.api}/restaurant`).toPromise();
      this.restaurant.businessHour = await this.http.get<IBusinessHourResponse[]>(`${environment.api}/businesshours`).toPromise();
      this.restaurant.delivery = await this.http.get<IDeliveryResponse[]>(`${environment.api}/delivery`).toPromise();
    }

    return this.restaurant;
  }

  getDayOfWeekName(value: number) {
    return this.DAYS_OF_WEEK.find(day => day.value === value).text;
  }
}
