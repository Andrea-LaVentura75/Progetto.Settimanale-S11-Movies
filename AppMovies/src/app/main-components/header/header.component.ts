import { Component } from '@angular/core';
import { AutenticazioneService } from '../../autenticazione/autenticazione.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: '.app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logged: boolean = false;
  constructor(
    private autenticazioneSvc: AutenticazioneService,
    private router: Router
  ) {}

  ngOnInit() {
    this.autenticazioneSvc.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.logged = isLoggedIn;
    });
  }
  logout() {
    this.autenticazioneSvc.logout();
  }
}
