import { IFavorites } from './i-favorites';
import { IFilm } from './i-film';
import { IUser } from './i-user';

export interface IAccessData {
  accessToken: string;
  user: IUser;
  film: IFilm;
  favorites: IFavorites;
}
