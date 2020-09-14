import { IonInput } from '@ionic/angular';
import { ToastService } from './../../core/services/toast.service';
import { ViaCepService } from './../../core/services/via-cep.service';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IUserPersonalInfo } from './../shared/iuser-personal-info.model';
import { UsersService } from './../shared/users.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  personalInfoModel: IUserPersonalInfo = {};

  validationText = {
    required: 'Campo obrigatório',
    email: 'E-mail inválido'
  };

  @ViewChild('inputNumber', { static: true })
  inputNumber: IonInput;

  userId: string;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private viaCepService: ViaCepService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUser().id;
    this.loadUserInfo();
  }

  async loadUserInfo() {
    this.personalInfoModel = await this.usersService.getById(this.userId);
  }

  async getAddressByCep() {
    try {
      if (this.personalInfoModel.cep) {
        const result = await this.viaCepService.getAddressByCep(this.personalInfoModel.cep);
        if (result) {
          this.personalInfoModel.street = result.logradouro;
          this.personalInfoModel.neighborhood = result.bairro;

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
      await this.usersService.update(this.userId, this.personalInfoModel);
      this.toastService.showSuccess('Informações alteradas com sucesso');
    } catch (error) {
      this.toastService.showError(error);
    }
  }
}
