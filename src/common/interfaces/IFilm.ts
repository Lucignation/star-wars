import { IPeople } from './IPeople';
import { IPlanet } from './IPlanet';
import { IStarship } from './IStarship';
import { IVehicle } from './IVehicle';

export interface IFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: IPeople[];
  planets: string[];
  starships: string[];
  vehicles: IVehicle[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}
