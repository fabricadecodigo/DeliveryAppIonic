import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IShoppingCartModel } from './../shared/ishopping-cart-model';
import { ShoppingCartService } from './../shared/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  items$: Observable<IShoppingCartModel[]>;
  subtotal$: Observable<number>;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  ngOnInit() {
    this.items$ = this.shoppingCartService.itemResult;
    this.subtotal$ = this.shoppingCartService.subtotalResult;
  }

  async loadItemActions(item: IShoppingCartModel) {
    const actionSheet = await this.actionSheetController.create({
      header: 'O que deseja?',
      buttons: [
        {
          text: 'Editar',
          role: 'edit',
          icon: 'create-outline',
          handler: () => {
            this.router.navigate(['/tabs/cardapio/edit/', item.product._id, item.id]);
          }
        },
        {
          text: 'Remover',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.shoppingCartService.remove(item);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }
}
