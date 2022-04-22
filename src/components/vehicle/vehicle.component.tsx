import { FC } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

//import from folders
import { Store } from '@/store/types';
import { IVehicle } from '@/common/interfaces/IVehicle';
import { IFilm } from '@/common/interfaces/IFilm';
import { getFilm, isFavorite, removeFav } from '@/store/actions';
import Link from '../link/link.component';

//CSS styles
import './vehicle.component.css';

type props = {
  vehicle: IVehicle;
  getFilm: (id: number) => IFilm | any;
  isFavorite: (fav: boolean) => void;
  removeFav: (vehicle: IVehicle) => void;
  showToast: (toast: string | any) => void;
};
const Vehicle: FC<props> = ({
  vehicle,
  getFilm,
  isFavorite,
  removeFav,
  showToast,
}) => {
  const navigate = useNavigate();
  const data = useSelector((state: Store) => state.resources);

  const { favoriteList } = data;

  //a film is selected
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]);
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`); // navigate to /films/film-title
  };

  //fav a vehicle
  const handleFavorite = (vehicle: IVehicle) => {
    if (favoriteList.some((item: IVehicle) => item.name === vehicle.name)) {
      removeFav(vehicle);
      isFavorite(false);
      showToast(`${vehicle.name} is removed`);
    } else {
      favoriteList.push(vehicle);
      isFavorite(true);
      showToast(`${vehicle.name} is faved`);
    }
  };

  const {
    name,
    model,
    max_atmosphering_speed,
    consumables,
    cost_in_credits,
    manufacturer,
    crew,
    passengers,
    cargo_capacity,
    vehicle_class,
    films,
  } = vehicle;

  return (
    <div className='vehicle-card'>
      <motion.div
        initial={{ y: -250 }}
        animate={{ y: 10 }}
        exit={{ y: -250 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
      >
        <div className='title-halves'>
          <h3>Name: {name}</h3>

          <div onClick={() => handleFavorite(vehicle)} className='fav-icons'>
            {favoriteList.some((item: IVehicle) => item.name === name) ? (
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

        <h4>Model: {model}</h4>
        <h4>Manufacturer: {manufacturer}</h4>
        <p>Cost: {cost_in_credits}</p>
        <div>
          <p>Atmophering Speed: {max_atmosphering_speed}</p>
          <p>Crew: {crew}</p>
          <p>Passengers: {passengers}</p>
        </div>
        <div>
          <p>Cargo Capacity: {cargo_capacity}</p>
          <p>Consumable: {consumables}</p>
          <p>Vehicle Class: {vehicle_class}</p>
        </div>
        <div className='vehicle-grid'>
          {films.map((film, index) => (
            <div key={index} onClick={() => handleSelectedFilm(film)}>
              <Link title={`Film ${index + 1}`} linkType='primary-link' />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default connect(null, {
  getFilm,
  isFavorite,
  removeFav,
})(Vehicle);
