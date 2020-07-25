import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardapioItemFormPage } from './cardapio-item-form.page';

describe('CardapioItemFormPage', () => {
  let component: CardapioItemFormPage;
  let fixture: ComponentFixture<CardapioItemFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardapioItemFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardapioItemFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
