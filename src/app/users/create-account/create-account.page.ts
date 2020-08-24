import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { ToastService } from './../../core/services/toast.service';
import { ViaCepService } from './../../core/services/via-cep.service';
import { AuthService } from './../shared/auth.service';
import { IUserModel } from './../shared/iuser-model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {

  user: IUserModel = {};

  validationText = {
    required: 'Campo obrigatório',
    email: 'E-mail inválido'
  };

  @ViewChild('inputNumber', { static: true })
  inputNumber: IonInput;


  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private viaCepService: ViaCepService
  ) { }

  async getAddressByCep() {
    try {
      if (this.user.cep) {
        const result = await this.viaCepService.getAddressByCep(this.user.cep);
        if (result) {
          this.user.stret = result.logradouro;
          this.user.neighborhood = result.bairro;
          this.user.city = result.localidade;

          if (this.inputNumber) {
            this.inputNumber.setFocus();
          }
        }
      }

    } catch (error) {
      this.toastService.showError('Ocorreu algum erro ao buscar o cep. Por favor tente novamente');
    }
  }

  async onSubmit() {
    try {
      await this.authService.createAccount(this.user);
      this.toastService.showSuccess('Conta criada com sucesso');
      this.router.navigate(['/login']);
    } catch (error) {
      this.toastService.showError(error);
    }
  }

}
