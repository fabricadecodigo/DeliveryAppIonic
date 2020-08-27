import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IShoppingCartModel } from './../../checkout/shared/ishopping-cart-model';
import { ShoppingCartService } from './../../checkout/shared/shopping-cart.service';
import { ToastService } from './../../core/services/toast.service';
import { CardapioService } from './../shared/cardapio.service';

@Component({
  selector: 'app-cardapio-item-form',
  templateUrl: './cardapio-item-form.page.html',
  styleUrls: ['./cardapio-item-form.page.scss'],
})
export class CardapioItemFormPage implements OnInit {
  model: IShoppingCartModel = {
    product: {},
    quantity: 1
  };

  productId: string;
  itemId?: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cardapioService: CardapioService,
    private toastService: ToastService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    this.loadProduct();

    const itemId = this.activatedRoute.snapshot.paramMap.get('itemId');
    if (itemId) {
      this.itemId = parseInt(itemId, 10);
      this.loadItem();
    }
  }

  async loadProduct() {
    try {
      const result = await this.cardapioService.getById(this.productId);
      if (result) {
        this.model.product._id = this.productId;
        this.model.product.description = result.description;
        this.model.product.name = result.name;
        this.model.product.photoUrl = result.photoUrl;
        this.model.product.price = result.price;
      }
    } catch (error) {
      this.toastService.showError('Ocorreu algum erro ao tentar buscar as informações do produto');
    }
  }

  loadItem() {
    const result = this.shoppingCartService.get(this.itemId);
    if (result) {
      this.model.id = result.id;
      this.model.note = result.note;
      this.model.quantity = result.quantity;
    }
  }

  onBtnPlusClick() {
    this.model.quantity++;
  }

  onBtnMinusClick() {
    this.model.quantity--;
    if (this.model.quantity <= 0) {
      this.model.quantity = 1;
    }
  }

  onSubmit() {
    try {
      if (this.model.id) {
        this.shoppingCartService.update(this.model);
      } else {
        this.shoppingCartService.add(this.model);
      }

      this.router.navigate(['/tabs/checkout/shopping-cart']);
    } catch (error) {
      this.toastService.showError('Ocorreu algum erro ao tentar salvar o produto no carrinho.');
    }
  }
}
