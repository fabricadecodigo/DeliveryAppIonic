import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-total',
  templateUrl: './shopping-cart-total.component.html',
  styleUrls: ['./shopping-cart-total.component.scss'],
})
export class ShoppingCartTotalComponent implements OnInit {
  @Input()
  subtotal: number;

  @Input()
  deliveryTax: number;

  @Input()
  deliveryFree = false;
  
  @Input()
  total: number;

  constructor() { }

  ngOnInit() {}

}
