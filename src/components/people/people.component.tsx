import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

//interfaces
import { IPeople } from '@/common/interfaces/IPeople';

//import from folders
import { getFilm, removeFav, isFavorite } from '@/store/actions';
import Link from '@/components/link/link.component';

//CSS styles
import './people.component.css';
import { Store } from '@/store/types';

type myProps = {
  person: IPeople;
  getFilm: any;
  removeFav: (people: IPeople) => void;
  resourcses: Store;
  isFavorite: (fav: boolean) => void;
};

const PeopleComponent: React.FC<myProps> = ({
  person,
  getFilm,
  removeFav,
  resourcses,
  isFavorite,
}) => {
  const navigate = useNavigate();

  const { favoriteList } = resourcses;

  //load selected film page
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]); //selected film number
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`);
  };

  //fav a person
  const handleFavorite = (person: IPeople) => {
    if (favoriteList.some((item) => item.name === person.name)) {
      removeFav(person);
      isFavorite(false);
    } else {
      favoriteList.push(person);
      isFavorite(true);
    }
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
            {favoriteList.some((item) => item.name === person.name) ? (
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

const mapPropsToState = (state: Store) => ({
  resourcses: state.resources,
});

export default connect(mapPropsToState, {
  getFilm,
  isFavorite,
  removeFav,
})(PeopleComponent);
