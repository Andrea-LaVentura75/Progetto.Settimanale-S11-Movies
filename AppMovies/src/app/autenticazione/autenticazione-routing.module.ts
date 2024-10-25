import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticazioneComponent } from './autenticazione.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: AutenticazioneComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticazioneRoutingModule {}
