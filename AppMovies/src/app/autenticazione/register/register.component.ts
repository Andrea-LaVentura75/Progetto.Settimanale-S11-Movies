import { Component } from '@angular/core';
import { IUser } from '../../interfaces/i-user';
import { AutenticazioneService } from '../autenticazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formObj: Partial<IUser> = {};
  isFormValid: boolean = false;

  constructor(
    private autenticazioneSvc: AutenticazioneService,
    private router: Router
  ) {}

  checkFormValid() {
    this.isFormValid =
      !!this.formObj.name?.trim() &&
      !!this.formObj.cognome?.trim() &&
      !!this.formObj.email?.trim() &&
      !!this.formObj.password?.trim();
  }

  register() {
    this.autenticazioneSvc.register(this.formObj).subscribe((res) => {
      this.router.navigate(['autenticazione/login']);
    });
  }
}
