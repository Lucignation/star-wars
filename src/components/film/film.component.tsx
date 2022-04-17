import React from 'react';

//import file
import { IFilm } from '../../common/interfaces/IFilm';
import { IPlanet } from '../../common/interfaces/IPlanet';

//CSS styles
import './film.component.css';

type props = {
  film: IFilm;
};

const Film: React.FC<props> = ({ film }) => {
  console.log(film);
  const planetSelected = (planet: IPlanet, index: number) => {
    console.log(planet);
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

export default Film;
