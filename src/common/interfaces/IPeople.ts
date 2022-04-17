import { IFilm } from './IFilm';

export interface IPeople {
  name: string;
  mass: string;
  skin_color: string;
  height: string;
  homeworld: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  films: string[] | IFilm[];
  created: string;
  edited: string;
  url: string;
}
