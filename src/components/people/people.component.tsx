import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

//interfaces
import { IPeople } from '../../common/interfaces/IPeople';

//import from folders
import { getFilm } from '../../store/actions';
import Link from '../../components/link/link.component';

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
      <motion.div
        initial={{ y: -250 }}
        animate={{ y: 10 }}
        exit={{ y: -250 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
      >
        <div className='title-halves'>
          <h2>{person.name}</h2>
          <p>Fav</p>
        </div>
        <div className='half'>
          <h4>Eyes: {person.eye_color}</h4>
          <h4>Hair: {person.hair_color}</h4>
        </div>

        <div className='half'>
          <h4>Height: {person.height}</h4>
          <h4>Mass: {person.mass}</h4>
        </div>
        <div className='people-grid'>
          {person.films.map((film, index) => (
            <div key={index} onClick={() => handleSelectedFilm(film)}>
              <Link title={`Film ${index + 1}`} linkType='primary-link' />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default connect(null, { getFilm })(PeopleComponent);
