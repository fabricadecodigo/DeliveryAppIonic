import { ICardapioProduct } from './../../cardapio/shared/icardapio';

export interface IShoppingCartModel {
    id?: number;
    product?: ICardapioProduct;
    quantity?: number;
    note?: string;
}
