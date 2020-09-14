import { IAddressResponse } from './iaddress-response';
import { IUserPersonalInfo } from './iuser-personal-info.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { AddressService } from './address.service';
import { IUserInfoResponse } from './iuser-info.response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private addressService: AddressService,
  ) { }

  async getById(userId: string) {
    const userInfo = await this.http.get<IUserInfoResponse>(`${environment.api}/customers/${userId}`).toPromise();
    // esse método já pega os dados do usuário logado
    const addresses = await this.addressService.getAllByUser();
    let firstAddress: IAddressResponse;
    if (addresses.length > 0) {
      firstAddress = addresses[0];
    }

    const result: IUserPersonalInfo = {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone
    };

    if (firstAddress) {
      result.cep = firstAddress.cep;
      result.street = firstAddress.street;
      result.number = firstAddress.number;
      result.complement = firstAddress.complement;
      result.neighborhood = firstAddress.neighborhood;
    }

    return result;
  }

  update(userId: string, user: IUserPersonalInfo) {
    const body = {
      name: user.name,
      phone: user.phone,
      address: {
        cep: user.cep,
        street: user.street,
        number: user.number,
        complement: user.complement,
        neighborhood: user.neighborhood,
      }
    };

    return this.http.put(`${environment.api}/customers/${userId}`, body).toPromise();
  }
}
