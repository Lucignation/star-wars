import axios from 'axios';
import { Dispatch } from 'redux';

import { IPeople } from '@/common/interfaces/IPeople';
import { IFilm } from '@/common/interfaces/IFilm';
import { IPlanet } from '@/common/interfaces/IPlanet';
import { IVehicle } from '@/common/interfaces/IVehicle';
import { IStarship } from '@/common/interfaces/IStarship';

export const SET_PEOPLE = 'SET_PEOPLE';
export const SET_FILMS = 'SET_FILMS';
export const SET_FILM = 'SET_FILM';
export const SET_PLANET = 'SET_PLANET';
export const APP_STATE = 'APP_STATE';
export const SET_PLANETS = 'SET_PLANETS';
export const SET_VEHICLES = 'SET_VEHICLES';
export const SET_STARSHIPS = 'SET_STARSHIPS';
export const SET_FAVORITE = 'SET_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const REMOVE_FILM_FAVORITE = 'REMOVE_FILM_FAVORITE';

export type ActionTypes =
  | { type: typeof SET_PEOPLE; payload: IPeople[] }
  | { type: typeof SET_FILMS; payload: IFilm[] }
  | { type: typeof SET_FILM; payload: IFilm }
  | { type: typeof APP_STATE; payload: boolean }
  | { type: typeof SET_PLANETS; payload: IPlanet[] }
  | { type: typeof SET_PLANET; payload: IPlanet }
  | { type: typeof SET_VEHICLES; payload: IVehicle[] }
  | { type: typeof SET_STARSHIPS; payload: IStarship[] }
  | { type: typeof SET_FAVORITE; payload: boolean }
  | { type: typeof REMOVE_FAVORITE; payload: void }
  | { type: typeof REMOVE_FILM_FAVORITE; payload: void };

//get request to people endpoint
export const getPeople =
  () =>
  async (dispatch: Dispatch): Promise<IPeople> => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(setLoading());
        const url = 'https://' + process.env.REACT_APP_PEOPLE;
        const people = await axios.get(url);
        dispatch({
          type: SET_PEOPLE,
          payload: people.data.results,
        });
        resolve(people.data.results);
      } catch (error) {
        reject(error);
      }
    });
  };

//updating the store for people
export const setPeople = (people: IPeople[]): ActionTypes => ({
  type: SET_PEOPLE,
  payload: people,
});

//updating the store for films
export const setFilms = (films: IFilm[]): ActionTypes => ({
  type: SET_FILMS,
  payload: films,
});

//get request to films endpoint
export const getFilms = () => async (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading());
      const url = 'https://' + process.env.REACT_APP_FILMS;
      const films = await axios.get(url);
      dispatch({
        type: SET_FILMS,
        payload: films.data.results,
      });
      resolve(films.data.results);
    } catch (error) {
      reject(error);
    }
  });
};

export const setLoading = (): ActionTypes => ({
  type: APP_STATE,
  payload: true,
});

//get request to vehicles endpoint
export const getVehicles = () => async (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading());
      const url = 'https://' + process.env.REACT_APP_VEHICLES;
      const vehicle = await axios.get(url);
      dispatch({ type: SET_VEHICLES, payload: vehicle.data.results });
      resolve(vehicle.data.results);
    } catch (error) {
      reject(error);
    }
  });
};

//get request to film endpoint
export const getFilm = (id: number) => async (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading());
      const url = `https://${process.env.REACT_APP_FILMS}/${id}`;
      const film = await axios.get(url);
      resolve(film.data);
      dispatch({
        type: SET_FILM,
        payload: film.data,
      });
    } catch (error: any) {
      reject(error.detail);
    }
  });
};

//get request to planet endpoint
export const getPlanet =
  (id: number) =>
  async (dispatch: Dispatch): Promise<IPlanet> => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(setLoading());
        const url = `https://${process.env.REACT_APP_PLANETS}/${id}`;
        const planet = await axios.get(url);
        resolve(planet.data);
        dispatch({ type: SET_PLANET, payload: planet.data });
      } catch (error: any) {
        reject({ error: error });
      }
    });
  };

//get request to starship endpoint
export const getStarships = () => async (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `https://${process.env.REACT_APP_STARSHIPS}`;
      const starship = await axios.get(url);
      dispatch({ type: SET_STARSHIPS, payload: starship.data.results });
      resolve(starship.data.results);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

//remove film fav from favorite list
export const removeFavorite = (film: IFilm) => (dispatch: Dispatch) => {
  dispatch({ type: REMOVE_FILM_FAVORITE, payload: film.title });
};

//remove people fav from the favorite list
export const removeFav =
  (people: IPeople | IVehicle | IStarship) => (dispatch: Dispatch) => {
    dispatch({ type: REMOVE_FAVORITE, payload: people.name });
  };

//fave a resources
export const isFavorite = (isFav: boolean) => async (dispatch: Dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: SET_FAVORITE, payload: isFav });
  });
};
