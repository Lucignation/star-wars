import { combineReducers } from 'redux';

import { IFilm } from '../common/interfaces/IFilm';
import { IPeople } from '../common/interfaces/IPeople';
import { SET_FILMS, SET_PEOPLE, ActionTypes, APP_STATE } from './actions';
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
