import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from './../../core/services/toast.service';
import { OrdersService } from './../../orders/shared/orders.service';
import { CardType } from './../shared/card-type.enum';
import { IPaymentModel } from './../shared/ipayment-model';
import { PaymentType } from './../shared/payment-type.enum';
import { ShoppingCartService } from './../shared/shopping-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  paymentModel: IPaymentModel = {
    paymentType: PaymentType.money
  };

  paymentType = PaymentType;
  cardType = CardType;

  subtotal$: Observable<number>;
  total$: Observable<number>;
  deliveryValue$: Observable<number>;
  deliveryFree$: Observable<boolean>;

  @ViewChild('form', { static: true })
  form: NgForm;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private toast: ToastService,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subtotal$ = this.shoppingCartService.subtotalResult;
    this.total$ = this.shoppingCartService.totalResult;
    this.deliveryValue$ = this.shoppingCartService.deliveryValueResult;
    this.deliveryFree$ = this.shoppingCartService.deliveryFreeResult;
  }

  onPaymentTypeChange() {
    this.paymentModel.changeFor = null;
    this.paymentModel.cardType = null;
  }

  get isFormInvalid() {
    if (this.form) {
      return this.form.invalid;
    }

    return false;
  }

  get isPaymentMoney() {
    return this.paymentModel.paymentType === PaymentType.money;
  }

  get isPaymentCard() {
    return this.paymentModel.paymentType === PaymentType.card;
  }

  async onSubmit() {
    try {
      this.shoppingCartService.setPaymentInfo(this.paymentModel);
      await this.ordersService.create();
      this.toast.showSuccess('Pedido enviado com sucesso.');
      this.router.navigate(['/tabs/orders/'], { queryParams: { tab: 'open' } });
    } catch (error) {
      this.toast.showError('Ocorreu algum erro ao tentar enviar seu pedido.');
    }
  }
}
