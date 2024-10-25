import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchAll, switchMap } from 'rxjs';
import { AutenticazioneService } from './autenticazione.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private autenticazioneSvc: AutenticazioneService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.autenticazioneSvc.autenticazioneSub$.pipe(
      switchMap((accesso) => {
        if (!accesso) {
          return next.handle(request);
        }
        const newRequest = request.clone({
          headers: request.headers.append(
            'Authorization',
            `Bearer ${accesso.accessToken}`
          ),
        });
        return next.handle(newRequest);
      })
    );
  }
}
