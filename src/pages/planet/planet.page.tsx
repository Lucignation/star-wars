import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

//import from folders
import { Store } from '@/store/types';
import { IPlanet } from '@/common/interfaces/IPlanet';
import { getFilm } from '@/store/actions';
import Button from '@/components/button/button.component';

//CSS styles
import './planet.page.css';

type props = {
  planet: IPlanet;
  getFilm: any;
};
const Planet: React.FC<props> = ({ planet, getFilm }) => {
  const navigate = useNavigate();

  //Go back
  const handleBackBtn = () => {
    navigate(-1);
  };

  //a film is selected
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]); //film number /films/4
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`);
  };
  return (
    <div className='planet-page-container'>
      <div onClick={() => handleBackBtn()}>
        <Button title='Back' />
      </div>
      <h1 className='planet-page-title'>Planet Name:{planet.name}</h1>

      <div className='planet-top-description'>
        <small>
          Created:{' '}
          {moment(planet.created).format('dddd, MMMM Do YYYY, h:mm:ss a')}
        </small>
        <small>
          Edited:{' '}
          {moment(planet.edited).format('dddd, MMMM Do YYYY, h:mm:ss a')}
        </small>
      </div>

      <div className='half planet-page-item'>
        <p>Rotation Period: {planet.rotation_period}</p>
        <p>Rotation Diameter: {planet.diameter}</p>
      </div>

      <div className='half planet-page-item'>
        <p>Climate: {planet.climate}</p>
        <p>Terrain: {planet.terrain}</p>
      </div>

      <div className='half planet-page-item'>
        <p>Orbital Period: {planet.orbital_period}</p>
        <p>Population: {planet.population}</p>
      </div>

      <div className='half planet-page-item'>
        <p>Surface Water: {planet.surface_water}</p>
        <p>Gravity: {planet.gravity}</p>
      </div>

      <div className='planet-film-grid'>
        {planet.films.map((film, index) => (
          <p
            key={index}
            onClick={() => handleSelectedFilm(film)}
            className='planet-film-link'
          >
            Film {index + 1}
          </p>
        ))}
      </div>
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  planet: state.resources.planet,
  favorite: state.resources.favorite,
});

export default connect(mapPropsToState, { getFilm })(Planet);
