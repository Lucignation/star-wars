import { IPeople } from '../common/interfaces/IPeople';
import { IFilm } from '../common/interfaces/IFilm';

export type Store = {
  resources?: any;
  allPeople: Array<IPeople>;
  people: IPeople;
  films: Array<IFilm>;
  film: IFilm;
  isLoading: boolean;
  favorite?: boolean;
};
