import { IOrderResponse } from './iorder-response';
import { OrderStatusEnum } from './order-status.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DeliveryPlaceType } from './../../checkout/shared/delivery-place-type.enum';
import { ShoppingCartService } from './../../checkout/shared/shopping-cart.service';
import { AuthService } from './../../users/shared/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) { }

  async create() {
    const user = this.authService.getUser();
    const delivery = this.shoppingCartService.getDeliveryInfo();
    const deliveryTax = this.shoppingCartService.getDeliveryTax();
    const payment = this.shoppingCartService.getPaymentInfo();
    const products = this.shoppingCartService.getAll();

    const address = {
      stret: '',
      number: '',
      complement: '',
      neighborhood: ''
    };

    if (delivery.deliveryPlaceType === DeliveryPlaceType.delivery) {
      address.stret = delivery.selectedAddress.stret;
      address.number = delivery.selectedAddress.number;
      address.complement = delivery.selectedAddress.complement;
      address.neighborhood = delivery.selectedAddress.neighborhood;
    }

    const body = {
      total: this.shoppingCartService.getTotal(),
      customer: {
        id: user.id
      },
      deliveryPlaceType: delivery.deliveryPlaceType,
      address,
      delivery: {
        free: deliveryTax.free,
        tax: deliveryTax.tax
      },
      payment: {
        paymentType: payment.paymentType,
        changeFor: payment.changeFor,
        cardType: payment.cardType
      },
      items: [...products.map(item => ({
        name: item.product.name,
        description: item.product.description,
        notes: item.note,
        price: item.product.price,
        quantity: item.quantity,
        total: (item.product.price * item.quantity)
      }))]
    };

    const result = await this.http.post(`${environment.api}/customers-orders`, body).toPromise();
    if (result) {
      this.shoppingCartService.clear();
    }

    return result;
  }

  getStatusName(status: number, deliveryPlaceType: DeliveryPlaceType) {
    switch (status) {
      case OrderStatusEnum.created:
        return 'Aguardando confirmação';
      case OrderStatusEnum.confirmed:
        return 'Pedido em preparo';
      case OrderStatusEnum.availableToDelivery:
        if (deliveryPlaceType === DeliveryPlaceType.delivery) {
          return 'Saiu para entrega';
        } else if (deliveryPlaceType === DeliveryPlaceType.restaurant) {
          return 'Disponível para retirada';
        } else {
          throw new Error();
        }
      case OrderStatusEnum.finished:
        return 'Pedido entregue';
    }
  }

  private getAll(open: boolean) {
    return this.http.get<IOrderResponse[]>(`${environment.api}/customers-orders`, { params: { open: String(open) } })
      .pipe(
        map(response => {
          return response.map(item => (
            {
              ...item,
              statusName: this.getStatusName(item.status, item.deliveryPlaceType)
            }
          ));
        })
      ).toPromise();
  }

  getAllOpen() {
    return this.getAll(true);
  }

  getAllFinished() {
    return this.getAll(false);
  }
}
