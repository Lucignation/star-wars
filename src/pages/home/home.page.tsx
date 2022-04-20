import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//Interfaces
import { IFilm } from '../../common/interfaces/IFilm';

//redux actions
import { getPeople, getFilms } from '../../store/actions';
import { Store } from '../../store/types';

//import from file
import People from '../people/people.page';
import Spinner from '../../utils/Spinner/Spinner';

//CSS styles
import './home.page.css';

type myProps = {
  getFilms: any;
};

const Home: React.FC<myProps> = ({ getFilms }) => {
  const [films, setFilms] = useState<IFilm[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const filmRes = await getFilms();
      setFilms(filmRes);
    };

    fetch();

    //cleanup
    return () => {
      setFilms([]);
    };
  }, [getFilms]);

  return (
    <div className='home'>
      <div className='home-container container-layout'>
        <People />
        <div className='home-film-sidebar'>
          <h2>Quick Films</h2>
          {films.length <= 0 ? (
            <Spinner />
          ) : (
            films.map((film, index) => (
              <div className='card film-card' key={index}>
                <p>Title: {film.title}</p>
                <p>Director: {film.director}</p>
                <p>Release Date: {film.release_date}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  favorite: state.resources.favorite,
});

export default connect(mapPropsToState, {
  getPeople,
  getFilms,
})(Home);
