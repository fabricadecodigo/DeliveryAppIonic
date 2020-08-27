export interface ICardapio {
    categoryName: string;
    products: ICardapioProduct[];
}

export interface ICardapioProduct {
    _id?: string;
    name?: string;
    price?: number;
    description?: string;
    photoUrl?: string;
}
