import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

//interfaces
import { IPeople } from '../../common/interfaces/IPeople';

//import from folders
import { getFilm } from '../../store/actions';

//CSS styles
import './people.component.css';

type myProps = {
  person: IPeople;
  getFilm: any;
};

const PeopleComponent: React.FC<myProps> = ({ person, getFilm }) => {
  const navigate = useNavigate();

  console.log(person);
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]); //selected film number
    console.log(film.split('/')[5]);
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`);
  };
  return (
    <div className='card'>
      <h2>Name: {person.name}</h2>
      <div>
        <h4>Eyes Color: {person.eye_color}</h4>
        <h4>Hair Color: {person.hair_color}</h4>
      </div>

      <div>
        <h4>Height: {person.height}</h4>
        <h4>Mass: {person.mass}</h4>
      </div>
      {person.films.map((film, index) => (
        <p key={index} onClick={() => handleSelectedFilm(film)}>
          Film {index + 1}
        </p>
      ))}
    </div>
  );
};

export default connect(null, { getFilm })(PeopleComponent);
