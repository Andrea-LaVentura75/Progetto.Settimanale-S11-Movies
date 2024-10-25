import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { IFilm } from '../../interfaces/i-film';
import { IFavorites } from '../../interfaces/i-favorites';
import { IUser } from '../../interfaces/i-user';
import { AutenticazioneService } from '../../autenticazione/autenticazione.service';
import { filter } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  arrayFilm: IFilm[] = [];
  utente?: IUser;
  arrayPreferiti: IFavorites[] = [];

  constructor(
    private filmSvc: FilmService,
    private autenticazioneSvc: AutenticazioneService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filmSvc.getAllFilm().subscribe((film) => {
      this.arrayFilm = film;
      console.log(this.arrayFilm);
    });

    this.autenticazioneSvc.user$
      .pipe(filter((u): u is IUser => !!u))
      .subscribe((u) => {
        this.utente = u;
        console.log('ciao');
      });
  }

  recuperaFavoriti(userId: number) {
    this.filmSvc.filmPreferitiUtente(userId).subscribe((like: IFavorites[]) => {
      this.arrayPreferiti = like;
    });
  }

  aggiungiFavorito(idFilm: number) {
    if (!this.utente) {
      console.error(
        'Utente non definito. Impossibile aggiungere ai preferiti.'
      );
      return;
    }

    this.filmSvc.filmPreferitiUtente(this.utente.id).subscribe((preferiti) => {
      const isAlreadyFavorite = preferiti.some((fav) => fav.movieId === idFilm);

      if (isAlreadyFavorite) {
        alert('Questo film è già presente tra i preferiti.');
        return;
      }

      const favorito: IFavorites = {
        userId: this.utente!.id,
        movieId: idFilm,
      };

      this.filmSvc.aggiungiFavorito(favorito).subscribe(() => {
        this.recuperaFavoriti(this.utente!.id);
        this.router.navigate(['/profilo', { filmId: idFilm }]);
      });
    });
  }
}
