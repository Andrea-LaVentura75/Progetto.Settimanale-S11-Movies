import { Component } from '@angular/core';
import { ILoginRequest } from '../../interfaces/i-login-request';
import { AutenticazioneService } from '../autenticazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formObj: ILoginRequest = {
    email: '',
    password: '',
  };

  constructor(
    private autenticazioneSvc: AutenticazioneService,
    private router: Router
  ) {}

  login() {
    this.autenticazioneSvc.login(this.formObj).subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }
}
