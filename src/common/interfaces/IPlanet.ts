import { IFilm } from './IFilm';

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
  residents: string[];
  films: string[] | IFilm[];
  created: string;
  edited: string;
  url: string;
}
