import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Interfaces
import { IFilm } from '@/common/interfaces/IFilm';

//redux actions
import { getPeople, getFilms, getFilm } from '@/store/actions';
import { Store } from '@/store/types';

//import from file
import People from '../people/people.page';
import Spinner from '@/utils/Spinner/Spinner';

//CSS styles
import './home.page.css';
import Link from '@/components/link/link.component';

type myProps = {
  getFilms: any;
  getFilm: any;
};

const Home: React.FC<myProps> = ({ getFilms, getFilm }) => {
  const [films, setFilms] = useState<IFilm[]>([]);

  const navigate = useNavigate();

  //fetch films onload
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

  //load selected film page
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]); //selected film number
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`);
  };

  return (
    <div className='home'>
      <div className='home-container container-layout'>
        <People homePage={true} />
        <div className='home-film-sidebar'>
          <h2 className='home-container-title'>Quick Films</h2>
          {films.length <= 0 ? (
            <Spinner />
          ) : (
            films.map((film, index) => (
              <div className='card film-card' key={index}>
                <h4>Title: {film.title}</h4>
                <p>Director: {film.director}</p>
                <p>Release Date: {film.release_date}</p>
                <div onClick={() => handleSelectedFilm(film.url)}>
                  <Link title='View Film' />
                </div>
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
  getFilm,
})(Home);
