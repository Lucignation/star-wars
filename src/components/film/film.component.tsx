import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//import file
import { IFilm } from '../../common/interfaces/IFilm';
import { IPlanet } from '../../common/interfaces/IPlanet';
import { getPlanet } from '../../store/actions';

//CSS styles
import './film.component.css';

type props = {
  film: IFilm;
  getPlanet: any;
};

const Film: React.FC<props> = ({ film, getPlanet }) => {
  const navigate = useNavigate();

  //selected planet
  const planetSelected = async (planet: string, index: number) => {
    const planetNum = parseInt(planet.split('/')[5]);
    const res = await getPlanet(planetNum);
    console.log(res.name);
    navigate(`/planets/${res.name}`);
  };
  return (
    <div className='card film-card'>
      <p>Title: {film.title}</p>
      <p>Director: {film.director}</p>
      <p>Release Date: {film.release_date}</p>
      <div className='film-planet-grid'>
        {film.planets.map((planet, index) => (
          <p key={index} onClick={() => planetSelected(planet, index)}>
            Planet {index + 1}
          </p>
        ))}
      </div>
    </div>
  );
};

export default connect(null, { getPlanet })(Film);
