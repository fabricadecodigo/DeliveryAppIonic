import { CardapioService } from './../shared/cardapio.service';
import { Component, OnInit } from '@angular/core';
import { ICardapio } from '../shared/icardapio';

@Component({
  selector: 'app-cardapio-list',
  templateUrl: './cardapio-list.page.html',
  styleUrls: ['./cardapio-list.page.scss'],
})
export class CardapioListPage implements OnInit {
  cardapio: ICardapio[] = [];

  constructor(
    private cardapioService: CardapioService
  ) { }

  async ngOnInit() {
    await this.loadAllProducts();
  }

  async loadAllProducts() {
    this.cardapio = await this.cardapioService.getAll();
  }

  async onSearchChange({ target }) {
    if (target.value && target.value.length >= 2) {
      this.cardapio = await this.cardapioService.getAll(target.value);
    }
  }

  async onSearchCancel() {
    await this.loadAllProducts();
  }
}
