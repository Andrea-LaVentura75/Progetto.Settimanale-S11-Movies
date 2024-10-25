import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFilm } from '../interfaces/i-film';
import { IFavorites } from '../interfaces/i-favorites';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  recuperoFilmUrl: string = environment.recuperoFilmUrl;
  recuperoFilmFavoriti: string = environment.recuperoFilmFavoriti;

  constructor(private http: HttpClient) {}

  getAllFilm(): Observable<IFilm[]> {
    return this.http.get<IFilm[]>(this.recuperoFilmUrl);
  }

  aggiungiFavorito(favorito: IFavorites): Observable<IFavorites> {
    return this.http.post<IFavorites>(this.recuperoFilmFavoriti, favorito);
  }

  filmPreferitiUtente(userId: number): Observable<IFavorites[]> {
    return this.http.get<IFavorites[]>(
      `${this.recuperoFilmFavoriti}?userId=${userId}`
    );
  }

  dettaglioFilm(filmId: number): Observable<IFilm> {
    return this.http.get<IFilm>(`${this.recuperoFilmUrl}/${filmId}`);
  }

  trovaPreferito(userId: number, movieId: number): Observable<IFavorites[]> {
    return this.http.get<IFavorites[]>(
      `${this.recuperoFilmFavoriti}?userId=${userId}&movieId=${movieId}`
    );
  }

  rimuovipreferiti(filmId: number) {
    return this.http.delete<void>(`${this.recuperoFilmFavoriti}/${filmId}`);
  }
}
