import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//interfaces
import { IPeople } from '@/common/interfaces/IPeople';
import { IStarship } from '@/common/interfaces/IStarship';
import { IFilm } from '@/common/interfaces/IFilm';

//import from folders
import {
  getFilm,
  removeFav,
  isFavorite,
  getStarship,
  getPerson,
} from '@/store/actions';
import Link from '@/components/link/link.component';
import { Store } from '@/store/types';

//CSS styles
import './people.component.css';

type myProps = {
  person: IPeople;
  getFilm: (id: number) => IFilm | any;
  getStarship: (id: number) => IStarship | any;
  removeFav: (people: IPeople) => void;
  isFavorite: (fav: boolean) => void;
  getPerson: (id: number) => IPeople | any;
  showToast: (toast: string | any) => void;
};

const PeopleComponent: React.FC<myProps> = ({
  person,
  getFilm,
  getStarship,
  removeFav,
  isFavorite,
  getPerson,
  showToast,
}) => {
  const navigate = useNavigate();
  const data = useSelector((state: Store) => state.resources);

  const { favoriteList } = data;

  //load selected film page
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]); //selected film number
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`);
  };

  //load selected starship page
  const handleSelectedStarShip = async (ship: string) => {
    const shipNum: number = parseInt(ship.split('/')[5]); //selected film number
    console.log(shipNum);
    const res = await getStarship(shipNum);
    console.log(res);
    navigate(`/starships/${res.name}`);
  };

  //fav a person
  const handleFavorite = (person: IPeople) => {
    if (favoriteList.some((item: IPeople | any) => item.name === person.name)) {
      removeFav(person);
      isFavorite(false);
      showToast(`${person.name} is removed`);
    } else {
      favoriteList.push(person);
      isFavorite(true);
      showToast(`${person.name} is faved`);
    }
  };

  //load people single page
  const handleSelectedPerson = async (person: string) => {
    const personNum: number = parseInt(person.split('/')[5]); //selected film number
    const res = await getPerson(personNum);
    navigate(`/people/${res.name}`);
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

          <div onClick={() => handleFavorite(person)} className='fav-icons'>
            {favoriteList.some(
              (item: IPeople | any) => item.name === person.name
            ) ? (
              <div className='fav-icon'>
                <AiFillHeart />
              </div>
            ) : (
              <div className='fav-icon'>
                <AiOutlineHeart />
              </div>
            )}
          </div>
        </div>

        <div onClick={() => handleSelectedPerson(person.url)}>
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

          <div className='people-grid'>
            {person.starships.map((ship, index) => (
              <div key={index} onClick={() => handleSelectedStarShip(ship)}>
                <Link
                  title={`StarShip ${index + 1}`}
                  linkType='secondeary-link'
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default connect(null, {
  getFilm,
  isFavorite,
  removeFav,
  getStarship,
  getPerson,
})(PeopleComponent);
