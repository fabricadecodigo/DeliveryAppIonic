import { Component, Input } from '@angular/core';
import { IOrderResponse } from './../shared/iorder-response';

@Component({
  selector: 'app-order-in-progress-list',
  templateUrl: './order-in-progress-list.component.html',
  styleUrls: ['./order-in-progress-list.component.scss'],
})
export class OrderInProgressListComponent {
  @Input()
  orders: IOrderResponse[] = [];

  constructor() { }
}
