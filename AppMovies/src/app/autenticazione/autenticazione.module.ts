import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticazioneRoutingModule } from './autenticazione-routing.module';
import { AutenticazioneComponent } from './autenticazione.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutenticazioneComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AutenticazioneRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AutenticazioneModule {}
