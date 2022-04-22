import { FC } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

//import interfaces
import { IFilm } from '@/common/interfaces/IFilm';
import { IPlanet } from '@/common/interfaces/IPlanet';
import { IStarship } from '@/common/interfaces/IStarship';

//import file
import {
  getPlanet,
  isFavorite,
  removeFavorite,
  getStarship,
  getFilm,
} from '@/store/actions';
import { Store } from '@/store/types';
import Link from '../link/link.component';

//CSS styles
import './film.component.css';

type props = {
  film: IFilm;
  getPlanet: (id: number) => IPlanet | any;
  isFavorite: (fav: boolean) => void;
  removeFavorite: (film: IFilm) => void;
  getStarship: (id: number) => IStarship | any;
  getFilm: (id: number) => IFilm | any;
  showToast: (toast: string | any) => void;
};

const Film: FC<props> = ({
  film,
  getPlanet,
  isFavorite,
  removeFavorite,
  getStarship,
  getFilm,
  showToast,
}) => {
  const data = useSelector((state: Store) => state.resources);
  let { favoriteList } = data;
  const navigate = useNavigate();

  // const [isFav, setIsFav] = useState<boolean>(favorite);

  //selected planet
  const planetSelected = async (planet: string, index: number) => {
    const planetNum: number = parseInt(planet.split('/')[5]);
    const res = await getPlanet(planetNum);
    navigate(`/planets/${res.name}`);
  };

  //load selected film page
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]); //selected film number
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`);
  };

  //fav a film
  const handleFavorite = (film: IFilm) => {
    if (favoriteList.some((item: IFilm) => item.title === film.title)) {
      removeFavorite(film);
      isFavorite(false);
      showToast(`${film.title} is removed`);
    } else {
      favoriteList.push(film);
      isFavorite(true);
      showToast(`${film.title} is faved`);
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

  const { title, url, director, release_date, planets, starships } = film;

  return (
    <div className='card film-card'>
      <motion.div
        initial={{ y: -250 }}
        animate={{ y: 10 }}
        exit={{ y: -250 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
      >
        <div className='title-halves'>
          <h3>Title: {title}</h3>
          <div onClick={() => handleFavorite(film)} className='fav-icons'>
            {favoriteList.some((item: IFilm) => item.title === title) ? (
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
        <div onClick={() => handleSelectedFilm(url)}>
          <p>Director: {director}</p>
          <p>Release Date: {release_date}</p>

          <div className='film-grid'>
            {planets.map((planet, index) => (
              <div key={index} onClick={() => planetSelected(planet, index)}>
                <Link title={`Planet ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className='film-grid'>
            {starships.map((ship, index) => (
              <div key={index} onClick={() => handleSelectedStarShip(ship)}>
                <Link
                  title={`Starship ${index + 1}`}
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
  getPlanet,
  isFavorite,
  removeFavorite,
  getStarship,
  getFilm,
})(Film);
