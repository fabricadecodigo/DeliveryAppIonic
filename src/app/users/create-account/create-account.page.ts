import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './../../core/services/toast.service';
import { AuthService } from './../shared/auth.service';
import { IUserModel } from './../shared/iuser-model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {

  user: IUserModel = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

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
