import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateChild } from '@angular/router';
import { GuestGuard } from './autenticazione/guards/guest.guard';
import { AuthGuard } from './autenticazione/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'autenticazione/login', pathMatch: 'full' },
  {
    path: 'autenticazione',
    loadChildren: () =>
      import('./autenticazione/autenticazione.module').then(
        (m) => m.AutenticazioneModule
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profilo',
    loadChildren: () =>
      import('./pages/profilo/profilo.module').then((m) => m.ProfiloModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
