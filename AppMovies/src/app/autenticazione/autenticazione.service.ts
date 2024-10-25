import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { IAccessData } from '../interfaces/i-access-data';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/i-user';
import { ILoginRequest } from '../interfaces/i-login-request';

@Injectable({
  providedIn: 'root',
})
export class AutenticazioneService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;

  autenticazioneSub$ = new BehaviorSubject<IAccessData | null>(null);

  user$: Observable<IUser | undefined> = this.autenticazioneSub$
    .asObservable()
    .pipe(
      tap((accessData) => (this.isLoggedIn = !!accessData)),
      map((accessData) => accessData?.user)
    );

  isLoggedIn$ = this.autenticazioneSub$.pipe(map((accessData) => !!accessData));

  isLoggedIn: boolean = false;

  autoLogoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  register(newUser: Partial<IUser>) {
    return this.http.post<IAccessData>(this.registerUrl, newUser);
  }

  login(authData: ILoginRequest) {
    return this.http.post<IAccessData>(this.loginUrl, authData).pipe(
      tap((accesso) => {
        this.autenticazioneSub$.next(accesso);
        localStorage.setItem('accesso', JSON.stringify(accesso));

        const dataScadenzaToken = this.jwtHelper.getTokenExpirationDate(
          accesso.accessToken
        );

        if (!dataScadenzaToken) return;

        this.autoLogout(dataScadenzaToken);
      })
    );
  }

  logout() {
    this.autenticazioneSub$.next(null);
    localStorage.removeItem('accesso');
    this.router.navigate(['autenticazione/login']);
  }

  autoLogout(expDate: Date) {
    const millisecondiRimanenti = expDate.getTime() - new Date().getTime();

    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, millisecondiRimanenti);
  }

  restoreUser() {
    const userJson: string | null = localStorage.getItem('accesso');
    if (!userJson) return;

    const accesso: IAccessData = JSON.parse(userJson);

    if (this.jwtHelper.isTokenExpired(accesso.accessToken)) {
      localStorage.removeItem('accesso');
      return;
    }
    this.autenticazioneSub$.next(accesso);
  }
}
