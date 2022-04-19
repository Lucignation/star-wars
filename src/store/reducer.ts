import { combineReducers } from 'redux';

import { IFilm } from '../common/interfaces/IFilm';
import { IPeople } from '../common/interfaces/IPeople';
import {
  SET_FILMS,
  SET_FILM,
  SET_PEOPLE,
  ActionTypes,
  APP_STATE,
  SET_PLANETS,
  SET_PLANET,
  SET_VEHICLES,
  SET_FAVORITE,
} from './actions';
import { Store } from './types';

const initialState: Store = {
  people: {
    name: '',
    mass: '',
    skin_color: '',
    height: '',
    homeworld: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    hair_color: '',
    species: [],
    starships: [],
    vehicles: [],
    films: [],
    created: '',
    edited: '',
    url: '',
  },
  allPeople: [],
  films: [],
  film: {
    title: '',
    episode_id: 0,
    opening_crawl: '',
    director: '',
    producer: '',
    release_date: '',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '',
    edited: '',
    url: '',
  },
  favorite: false,
  isLoading: false,
  vehicles: [],
  planets: [],
  starships: [],
  vehicle: {
    name: '',
    model: '',
    manufacturer: '',
    cost_in_credits: '',
    length: '',
    max_atmosphering_speed: '',
    crew: '',
    passengers: '',
    cargo_capacity: '',
    consumables: '',
    vehicle_class: '',
    pilots: [],
    films: [],
    created: '',
    edited: '',
    url: '',
  },
  planet: {
    name: '',
    rotation_period: '',
    orbital_period: '',
    diameter: '',
    climate: '',
    gravity: '',
    terrain: '',
    surface_water: '',
    population: '',
    residents: [],
    films: [],
    created: '',
    edited: '',
    url: '',
  },
  starship: {
    name: '',
    model: '',
    manufacturer: '',
    cost_in_credits: '',
    length: '',
    max_atmosphering_speed: '',
    crew: '',
    passengers: '',
    cargo_capacity: '',
    consumables: '',
    hyperdrive_rating: '',
    MGLT: '',
    starship_class: '',
    pilots: [],
    films: [],
    created: '',
    edited: '',
    url: '',
  },
  favoriteList: [],
  filmFav: false,
  peopleFav: false,
  planetFav: false,
  vehicleFav: false,
};

function resourcesReducer(state: Store = initialState, action: ActionTypes) {
  switch (action.type) {
    case SET_PEOPLE:
      return {
        ...state,
        allPeople: action.payload,
        isLoading: false,
      };

    case SET_FILMS:
      return {
        ...state,
        films: action.payload,
        isLoading: false,
      };

    case SET_FILM:
      return {
        ...state,
        film: action.payload,
        isLoading: false,
      };

    case SET_PLANET:
      return {
        ...state,
        planet: action.payload,
        isLoading: false,
      };

    case SET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
        isLoading: false,
      };

    case SET_FAVORITE:
      return {
        ...state,
        favorite: action.payload,
      };

    case APP_STATE:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  resources: resourcesReducer,
});

export default rootReducer;
