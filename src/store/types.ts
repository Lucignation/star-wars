import { IPeople } from '@/common/interfaces/IPeople';
import { IFilm } from '@/common/interfaces/IFilm';
import { IVehicle } from '@/common/interfaces/IVehicle';
import { IPlanet } from '@/common/interfaces/IPlanet';
import { IStarship } from '@/common/interfaces/IStarship';

export type Store = {
  resources?: any;
  allPeople: Array<IPeople>;
  people: IPeople;
  films: Array<IFilm>;
  film: IFilm;
  isLoading: boolean;
  favorite: boolean;
  vehicles: Array<IVehicle>;
  vehicle: IVehicle;
  planets: Array<IPlanet>;
  planet: IPlanet;
  starships: Array<IStarship>;
  starship: IStarship;
  favoriteList: any[];
  filmFav: boolean;
  planetFav: boolean;
  peopleFav: boolean;
  vehicleFav: boolean;
};
