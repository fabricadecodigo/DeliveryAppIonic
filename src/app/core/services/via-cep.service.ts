import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IViaCepResult {
  logradouro: string;
  bairro: string;
  localidade: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private http: HttpClient) { }

  getAddressByCep(cep: string) {
    cep = cep.replace('-', '');

    return this.http.get<IViaCepResult>(`https://viacep.com.br/ws/${cep}/json/`).toPromise();
  }
}
