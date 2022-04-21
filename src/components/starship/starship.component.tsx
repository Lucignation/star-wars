import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

//import interfaces
import { IStarship } from '@/common/interfaces/IStarship';

//import from folders
import Link from '../link/link.component';
import {
  getFilm,
  removeFav,
  isFavorite,
  getStarship,
} from '../../store/actions';
import { StarRating } from '@/utils/Rating/Rating';

//CSS styles
import './starship.component.css';
import { Store } from '@/store/types';

type props = {
  starship: IStarship;
  getFilm: any;
  resourcses: Store;
  removeFav: (startship: IStarship) => void;
  isFavorite: (fav: boolean) => void;
  getStarship: any;
};

const StarShip: FC<props> = ({
  starship,
  getFilm,
  resourcses,
  removeFav,
  isFavorite,
  getStarship,
}) => {
  const navigate = useNavigate();

  const { favoriteList } = resourcses;

  //selectd film
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]); //selected film number
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`);
  };

  //fav a starship
  const handleFavorite = (starship: IStarship) => {
    if (favoriteList.some((item) => item.name === starship.name)) {
      removeFav(starship);
      isFavorite(false);
    } else {
      favoriteList.push(starship);
      isFavorite(true);
    }
  };

  //load selected starship page
  const handleSelectedStarShip = async (ship: string) => {
    const shipNum: number = parseInt(ship.split('/')[5]); //selected film number
    console.log(shipNum);
    const res = await getStarship(shipNum);
    console.log(res);
    navigate(`/starships/${res.name}`);
  };

  console.log(starship);

  return (
    <div className='starship-card'>
      <motion.div
        initial={{ y: -250 }}
        animate={{ y: 10 }}
        exit={{ y: -250 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
      >
        <div className='title-halves'>
          <h2>{starship.name}</h2>

          <div onClick={() => handleFavorite(starship)} className='fav-icons'>
            {favoriteList.some((item) => item.name === starship.name) ? (
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

        <div onClick={() => handleSelectedStarShip(starship.url)}>
          <p>Model: {starship.model}</p>
          <p>Manufacturer: {starship.manufacturer}</p>

          <div className='half'>
            <p>Cargo Capacity: {starship.cargo_capacity}</p>
            <p>MGLT: {starship.MGLT}</p>
            <p>Consumable: {starship.consumables}</p>
          </div>

          <div className='half'>
            <div>Crew: {starship.crew}</div>

            <p>Max Speed: {starship.max_atmosphering_speed}</p>
            <p>Length: {starship.length}</p>
          </div>
          <div className='rate'>
            Hyper Drive Rating:
            <span>
              <StarRating
                rate={Math.trunc(parseInt(starship.hyperdrive_rating))}
              />
            </span>
          </div>

          <div className='half'>
            <p>Passengers: {starship.passengers}</p>
            <p>Class: {starship.starship_class}</p>
          </div>

          <div className='starship-film-link'>
            {starship.films.map((film, index) => (
              <div key={index} onClick={() => handleSelectedFilm(film)}>
                <Link title={`Film ${index + 1}`} />
              </div>
            ))}
          </div>
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
  removeFav,
  isFavorite,
  getStarship,
})(StarShip);
