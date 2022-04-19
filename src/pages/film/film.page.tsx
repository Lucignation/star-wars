import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

//import from folders
import { Store } from '../../store/types';
import { IFilm } from '../../common/interfaces/IFilm';
import { getFilms, getPlanet } from '../../store/actions';
import Spinner from '../../utils/Spinner/Spinner';
import Button from '../../components/button/button.component';

type props = {
  film: IFilm;
  getPlanet: any;
  isLoading: boolean;
  getFilms: any;
};
const Film: React.FC<props> = ({ film, getPlanet, isLoading, getFilms }) => {
  const navigate = useNavigate();

  

  const handleBackBtn = () => {
    navigate(-1);
  };

  const handleSelectedPlanet = async (planet: string) => {
    const planetNum: number = parseInt(planet.split('/')[5]); //planet number /planet/3
    const res = await getPlanet(planetNum);
    console.log(res.name);
    navigate(`/planets/${res.name}`);
  };
  return (
    <div className='card film-card'>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div onClick={() => handleBackBtn()}>
            <Button title='Back' />
          </div>
          <h2>Title: {film?.title}</h2>
          <p>Director: {film?.director}</p>
          <p>
            Release Date:{' '}
            {moment(film?.release_date).format('dddd, MMMM Do YYYY')}
          </p>
          <p>Episode: {film?.episode_id}</p>
          <div className='film-planet-grid'>
            {film?.planets.map((planet, index) => (
              <p key={index} onClick={() => handleSelectedPlanet(planet)}>
                Planet {index + 1}
              </p>
            ))}
          </div>
          <p>
            Created:{' '}
            {moment(film?.created).format('dddd, MMMM Do YYYY, h:mm:ss a')}
          </p>
          <p>
            Edited:{' '}
            {moment(film?.edited).format('dddd, MMMM Do YYYY, h:mm:ss a')}
          </p>
          <div>
            <h4>Opening Crawl:</h4>
            <p>{film?.opening_crawl}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  film: state.resources.film,
  favorite: state.resources.favorite,
});

export default connect(mapPropsToState, { getPlanet, getFilms })(Film);
