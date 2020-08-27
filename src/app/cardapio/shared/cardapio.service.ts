import { environment } from './../../../environments/environment';
import { ICardapioResponse, ICardapioCategoryResponse } from './icardapio-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICardapio, ICardapioProduct } from './icardapio';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  constructor(private http: HttpClient) { }

  async getAll(productName: string = '') {
    let params = new HttpParams();

    if (productName) {
      params = params.append('name', productName);
    }

    const allProducts = await this.http.get<ICardapioResponse[]>(`${environment.api}/cardapio`, { params }).toPromise();
    const distinctCategories = this.getCategoriesFromCardapioResponse(allProducts);
    const cardapioItems = this.getProductsGroupedByCategory(distinctCategories, allProducts);

    return cardapioItems;
  }

  private getCategoriesFromCardapioResponse(products: ICardapioResponse[]) {
    const categoriesIds = products.map(p => p.category._id);

    const distinctCategories = [...new Set(categoriesIds)]
      .map(categoryId => ({
        _id: categoryId,
        name: products.find(p => p.category._id === categoryId).category.name
      }));

    return distinctCategories;
  }

  private getProductsGroupedByCategory(categories: ICardapioCategoryResponse[], products: ICardapioResponse[]) {
    const cardapioItems = categories
      .map(category => {
        const cardapio: ICardapio = {
          categoryName: category.name,
          products: products.filter(p => p.category._id === category._id)
            .map(productMap => ({
              _id: productMap._id,
              name: productMap.name,
              price: productMap.price,
              description: productMap.description,
              photoUrl: productMap.photoUrl
            }))
        };

        return cardapio;
      });

    return cardapioItems;
  }

  getById(id: string) {
    return this.http.get<ICardapioResponse>(`${environment.api}/cardapio/${id}`).toPromise();
  }
}
