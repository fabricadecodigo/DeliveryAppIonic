import { Component, Input } from '@angular/core';
import { IOrderResponse } from './../shared/iorder-response';

@Component({
  selector: 'app-order-old-list',
  templateUrl: './order-old-list.component.html',
  styleUrls: ['./order-old-list.component.scss'],
})
export class OrderOldListComponent {
  @Input()
  orders: IOrderResponse[] = [];

  constructor() { }
}
