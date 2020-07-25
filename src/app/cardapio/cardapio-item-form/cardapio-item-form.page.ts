import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardapio-item-form',
  templateUrl: './cardapio-item-form.page.html',
  styleUrls: ['./cardapio-item-form.page.scss'],
})
export class CardapioItemFormPage implements OnInit {
  model = {
    qtd: 1,
    obs: ''
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onBtnPlusClick() {
    this.model.qtd++;
  }

  onBtnMinusClick() {
    this.model.qtd--;
    if (this.model.qtd <= 0) {
      this.model.qtd = 1;
    }
  }

  onSubmit() {
    this.router.navigate(['/tabs/cardapio/shopping-cart']);
  }
}
