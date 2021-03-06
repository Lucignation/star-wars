import { FC } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

//import from folders
import { Store } from '@/store/types';
import Spinner from '@/utils/Spinner/Spinner';
import Button from '@/components/button/button.component';
import Link from '@/components/link/link.component';
import { getFilm, removeFav, isFavorite } from '@/store/actions';
import { IStarship } from '@/common/interfaces/IStarship';
import { StarRating } from '@/utils/Rating/Rating';

type props = {
  resources: Store;
  getFilm: any;
  removeFav: (ship: IStarship) => void;
  isFavorite: (fav: boolean) => void;
};
const StarShip: FC<props> = ({ resources, getFilm, removeFav, isFavorite }) => {
  const navigate = useNavigate();

  const { starship, isLoading, favoriteList } = resources;

  //go back
  const handleBackBtn = () => {
    navigate(-1);
  };

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

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div onClick={() => handleBackBtn()}>
            <Button title='Back' />
          </div>
          <div className='starship-card'>
            <motion.div
              initial={{ y: -250 }}
              animate={{ y: 10 }}
              exit={{ y: -250 }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            >
              <div className='title-halves'>
                <h2>{starship.name}</h2>

                <div
                  onClick={() => handleFavorite(starship)}
                  className='fav-icons'
                >
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

              <p>Model: {starship.model}</p>
              <p>Manufacturer: {starship.manufacturer}</p>

              <div className='half'>
                <p>Cargo Capacity: {starship.cargo_capacity}</p>
                <p>MGLT: {starship.MGLT}</p>
                <p>Consumable: {starship.consumables}</p>
              </div>

              <div className='half'>
                <p>Crew: {starship.crew}</p>

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
                    <Link title='film' />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  resources: state.resources,
});

export default connect(mapPropsToState, { getFilm, removeFav, isFavorite })(
  StarShip
);
