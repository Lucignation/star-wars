import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

//import file
import { IFilm } from '@/common/interfaces/IFilm';
import { getPlanet, isFavorite, removeFavorite } from '@/store/actions';
import { Store } from '@/store/types';
import Link from '../link/link.component';

//CSS styles
import './film.component.css';

type props = {
  resourcses: Store;
  film: IFilm;
  getPlanet: any;
  isFavorite: (fav: boolean) => void;
  removeFavorite: (film: IFilm) => void;
};

const Film: React.FC<props> = ({
  resourcses,
  film,
  getPlanet,
  isFavorite,
  removeFavorite,
}) => {
  let { favoriteList } = resourcses;
  const navigate = useNavigate();

  // const [isFav, setIsFav] = useState<boolean>(favorite);

  //selected planet
  const planetSelected = async (planet: string, index: number) => {
    const planetNum: number = parseInt(planet.split('/')[5]);
    const res = await getPlanet(planetNum);
    navigate(`/planets/${res.name}`);
  };

  //fav a film
  const handleFavorite = (film: IFilm) => {
    if (favoriteList.some((item) => item.title === film.title)) {
      removeFavorite(film);
      isFavorite(false);
    } else {
      favoriteList.push(film);
      isFavorite(true);
    }
  };

  return (
    <div className='card film-card'>
      <motion.div
        initial={{ y: -250 }}
        animate={{ y: 10 }}
        exit={{ y: -250 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
      >
        <div className='title-halves'>
          <h3>Title: {film.title}</h3>
          <div onClick={() => handleFavorite(film)} className='fav-icons'>
            {favoriteList.some((item) => item.title === film.title) ? (
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
        <p>Director: {film.director}</p>
        <p>Release Date: {film.release_date}</p>

        <div className='film-grid'>
          {film.planets.map((planet, index) => (
            <div key={index} onClick={() => planetSelected(planet, index)}>
              <Link title={`Planet ${index + 1}`} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  resourcses: state.resources,
  isFavorite: state.resources.favorite,
  favoriteList: state.resources.favoriteList,
  isFilmFav: state.resources.filmFav,
});

export default connect(mapPropsToState, {
  getPlanet,
  isFavorite,
  removeFavorite,
})(Film);
