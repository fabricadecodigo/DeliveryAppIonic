import { environment } from './../../../environments/environment';
import { IAddressResponse } from './iaddress-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  getAllByUser() {
    return this.http.get<IAddressResponse[]>(`${environment.api}/customers-addresses`).toPromise();
  }

  getAddressText(street: string, addressNumber: string, complement: string, neighborhood: string) {
    let address = `${street}, ${addressNumber}`;
    if (complement) {
      address += ` - ${complement}`;
    }
    address += ` - ${neighborhood}`;
    return address;
  }
}
