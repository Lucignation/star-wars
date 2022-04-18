import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//Interfaces
import { IPeople } from '../../common/interfaces/IPeople';
import { IFilm } from '../../common/interfaces/IFilm';

//redux actions
import { getPeople, setPeople, getFilms, setFilms } from '../../store/actions';
import { Store } from '../../store/types';

//import from file
import People from '../people/people.page';
import Search from '../../components/search/search.component';
import Film from '../../components/film/film.component';
import SideAttribute from '../../HOC/SideAttribute/SideAttribute';

import './home.page.css';

type myProps = {
  setPeople: any;
  setFilms: any;
  getPeople: any;
  getFilms: any;
  isLoading: boolean;
  films: Array<IFilm>;
  favorite: boolean;
};

// const RenderedComponent = SideAttribute(Film, "films");

const Home: React.FC<myProps> = ({
  setPeople,
  setFilms,
  isLoading,
  getPeople,
  getFilms,
  films,
  favorite,
}) => {
  useEffect(() => {
    const fetch = async () => {
      await getPeople();
      await getFilms();
      // console.log(data);
      // setPeople(res);
      // setFilms(data);
    };

    fetch();
  }, []);
  console.log(favorite);
  return (
    <div className='home'>
      <div className='home-container container-layout'>
        <People />
        <div>
          <h2>Films</h2>
          {films.map((film, index) => (
            <div className='card film-card' key={index}>
              <p>Title: {film.title}</p>
              <p>Director: {film.director}</p>
              <p>Release Date: {film.release_date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// console.log(isLoading);

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  films: state.resources.films,
  favorite: state.resources.favorite,
});

export default connect(mapPropsToState, {
  getPeople,
  setPeople,
  getFilms,
  setFilms,
})(Home);
