import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { environment } from './../../../environments/environment';
import { IAuthResponse } from './iauth-response';
import { IUserModel } from './iuser-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpClient;

  constructor(
    private httpBackend: HttpBackend
  ) {
    this.http = new HttpClient(this.httpBackend);
  }

  async login(email: string, password: string) {
    try {
      const response = await this.http.post<IAuthResponse>(
        `${environment.api}/auth-customer/login`,
        { email, password }).toPromise();

      if (response.access_token) {
        this.setAuthorizationToken(response.access_token);
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(this.handlerError(error));
    }
  }

  async createAccount(user: IUserModel) {
    try {
      // crating an account with email and password
      const body = {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: {
          cep: user.cep,
          street: user.street,
          number: user.number,
          complement: user.complement,
          neighborhood: user.neighborhood
        }
      };

      const response = await this.http.post<IUserModel>(`${environment.api}/customers`, body).toPromise();
      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Ocorreu algum erro ao tentar criar a conta. Por favor tente novamente.');
    }
  }

  private handlerError(error: HttpErrorResponse) {
    let mensagem = '';

    if (error.status === 401) {
      mensagem = 'Usuario/senha inválido(s)';
    } else {
      mensagem = 'Ocorreu algum erro ao tentar efetuar o login';
    }

    return mensagem;
  }

  setAuthorizationToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeAuthorizationToken() {
    localStorage.removeItem('token');
  }

  getAuthorizationToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getUser() {
    const token = this.getAuthorizationToken();
    const decoded: any = jwt_decode(token);
    return {
      email: decoded.email,
      id: decoded.sub
    };
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }

    return false;
  }
}
