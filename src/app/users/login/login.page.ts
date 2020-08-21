import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './../../core/services/toast.service';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
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
      await this.authService.login(this.user.email, this.user.password);
      this.toastService.showSuccess('Login efetuado com sucesso');
      this.router.navigate(['/']);
    } catch (error) {
      this.toastService.showError(error);
    }
  }
}
