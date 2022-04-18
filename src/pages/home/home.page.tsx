import React, { useEffect, Suspense, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

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
import Spinner from '../../utils/Spinner/Spinner';

import './home.page.css';

type myProps = {
  getPeople: any;
  getFilms: any;
  isLoading: boolean;
  films: Array<IFilm>;
  favorite: boolean;
};

// const RenderedComponent = SideAttribute(Film, "films");

const Home: React.FC<myProps> = ({
  isLoading,
  getPeople,
  getFilms,
  films,
  favorite,
}) => {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [_films, setFilms] = useState<IFilm[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const peopleRes = await getPeople();
      setPeople(peopleRes);
      const filmRes = await getFilms();
      setFilms(filmRes);
      // console.log(data);
      // setPeople(res);
      // setFilms(data);
    };

    fetch();

    //cleanup
    return () => {
      setPeople([]);
      setFilms([]);
    };
  }, []);

  console.log(favorite);
  return (
    <div className='home'>
      <div className='home-container container-layout'>
        {isLoading || people.length <= 0 ? (
          <Spinner />
        ) : (
          <motion.div
            initial={{ y: -250 }}
            animate={{ y: 10 }}
            exit={{ y: -250 }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          >
            <People />
          </motion.div>
        )}
        <div>
          <h2>Films</h2>
          {isLoading && films.length < 0 ? (
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

// console.log(isLoading);

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  films: state.resources.films,
  favorite: state.resources.favorite,
});

export default connect(mapPropsToState, {
  getPeople,
  getFilms,
})(Home);
