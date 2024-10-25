import { Component, OnInit, TemplateRef } from '@angular/core';
import { IFilm } from '../../interfaces/i-film';
import { FilmService } from '../../services/film.service';
import { AutenticazioneService } from '../../autenticazione/autenticazione.service';
import { IFavorites } from '../../interfaces/i-favorites';
import { IUser } from '../../interfaces/i-user';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfiloComponent implements OnInit {
  arrayFilm: IFilm[] = [];
  arrayPreferiti: IFavorites[] = [];
  utente!: IUser;
  userId!: number;
  profiloUtente: IUser | null = null;

  constructor(
    private filmSvc: FilmService,
    private autenticazioneSvc: AutenticazioneService,
    private route: ActivatedRoute,
    private offcanvasService: NgbOffcanvas
  ) {}

  openProfileOffcanvas(content: TemplateRef<any>) {
    this.autenticazioneSvc.user$.subscribe((user) => {
      console.log('Utente dal servizio:', user);
      this.profiloUtente = user ?? null;
    });
    console.log(this.profiloUtente);

    this.offcanvasService.open(content, { position: 'start' });
  }

  ngOnInit() {
    this.autenticazioneSvc.user$.subscribe((u) => {
      if (u) {
        this.utente = u;
        this.userId = u.id;

        const filmId = this.route.snapshot.paramMap.get('filmId');
        if (filmId) {
          console.log('Film aggiunto ai preferiti con ID:', filmId);
        }

        this.filmSvc
          .filmPreferitiUtente(this.userId)
          .subscribe((like: IFavorites[]) => {
            this.arrayPreferiti = like;
            this.stampaFavoriti();
          });
      } else {
        console.error('Utente non autenticato.');
      }
    });
  }

  stampaFavoriti() {
    if (this.arrayPreferiti.length === 0) {
      console.log('Nessun film preferito trovato.');
      return;
    }

    const richiesteFilm = this.arrayPreferiti.map((fav) =>
      this.filmSvc.dettaglioFilm(fav.movieId)
    );

    forkJoin(richiesteFilm).subscribe((dettagliFilm) => {
      this.arrayFilm = dettagliFilm;
      console.log(this.arrayFilm);
    });
  }

  rimuoviPreferiti(filmId: number) {
    this.filmSvc.trovaPreferito(this.userId, filmId).subscribe((preferiti) => {
      if (preferiti.length > 0 && preferiti[0].id !== undefined) {
        const preferitoId = preferiti[0].id;

        this.filmSvc.rimuovipreferiti(preferitoId).subscribe({
          next: () => {
            this.arrayFilm = this.arrayFilm.filter(
              (film) => film.id !== filmId
            );
            this.arrayPreferiti = this.arrayPreferiti.filter(
              (fav) => fav.movieId !== filmId
            );
            alert('Film eliminato dai preferiti');
          },

          complete: () => {
            console.log('Operazione di rimozione completata.');
          },
        });
      }
    });
  }
}
