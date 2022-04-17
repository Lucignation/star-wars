import axios from 'axios';

import { IPeople } from '../common/interfaces/IPeople';
import { IFilm } from '../common/interfaces/IFilm';

export const SET_PEOPLE = 'SET_PEOPLE';
export const SET_FILMS = 'SET_FILMS';
export const APP_STATE = 'APP_STATE';

export type ActionTypes =
  | { type: typeof SET_PEOPLE; payload: IPeople[] }
  | { type: typeof SET_FILMS; payload: IFilm[] }
  | { type: typeof APP_STATE; payload: boolean };

export const getPeople = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading();
      const url = 'https://' + process.env.REACT_APP_PEOPLE;
      const people = await axios.get(url);
      resolve(people.data.results);
    } catch (error) {
      reject(error);
    }
  });
};

export const setPeople = (people: IPeople[]): ActionTypes => ({
  type: SET_PEOPLE,
  payload: people,
});

export const setFilms = (films: IFilm[]): ActionTypes => ({
  type: SET_FILMS,
  payload: films,
});

export const getFilms = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      setLoading();
      const url = 'https://' + process.env.REACT_APP_FILMS;
      const films = await axios.get(url);
      resolve(films.data.results);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const setLoading = (): ActionTypes => ({
  type: APP_STATE,
  payload: true,
});
