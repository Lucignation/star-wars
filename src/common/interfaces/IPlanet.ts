import { IFilm } from './IFilm';
import { IPeople } from './IPeople';

export interface IPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: IPeople[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
