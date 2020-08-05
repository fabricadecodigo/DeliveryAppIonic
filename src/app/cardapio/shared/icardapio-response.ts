export interface ICardapioResponse {
    _id: string;
    name: string;
    price: number;
    description: string;
    photoUrl: string;
    category: ICardapioCategoryResponse;
}

export interface ICardapioCategoryResponse {
    _id: string;
    name: string;
}
