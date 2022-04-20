import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

//import from folders
import { Store } from '../../store/types';
import { IVehicle } from '../../common/interfaces/IVehicle';
import { getFilm, isFavorite, removeFav } from '../../store/actions';
import Link from '../link/link.component';

//CSS styles
import './vehicle.component.css';

type props = {
  vehicle: IVehicle;
  getFilm: any;
  resources: Store;
  isFavorite: (fav: boolean) => void;
  removeFav: (vehicle: IVehicle) => void;
};
const Vehicle: React.FC<props> = ({
  vehicle,
  getFilm,
  resources,
  isFavorite,
  removeFav,
}) => {
  const navigate = useNavigate();

  const { favoriteList } = resources;

  //a film is selected
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]);
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`); // navigate to /films/film-title
  };

  //fav a vehicle
  const handleFavorite = (vehicle: IVehicle) => {
    if (favoriteList.some((item) => item.name === vehicle.name)) {
      removeFav(vehicle);
      isFavorite(false);
    } else {
      favoriteList.push(vehicle);
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
          <h3>Name: {vehicle.name}</h3>
          <div onClick={() => handleFavorite(vehicle)} className='fav-icons'>
            {favoriteList.some((item) => item.name === vehicle.name) ? (
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

        <h4>Model: {vehicle.model}</h4>
        <h4>Manufacturer: {vehicle.manufacturer}</h4>
        <p>Cost: {vehicle.cost_in_credits}</p>
        <div>
          <p>Atmophering Speed: {vehicle.max_atmosphering_speed}</p>
          <p>Crew: {vehicle.crew}</p>
          <p>Passengers: {vehicle.passengers}</p>
        </div>
        <div>
          <p>Cargo Capacity: {vehicle.cargo_capacity}</p>
          <p>Consumable: {vehicle.consumables}</p>
          <p>Vehicle Class: {vehicle.vehicle_class}</p>
        </div>
        <div className='vehicle-grid'>
          {vehicle.films.map((film, index) => (
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
  resources: state.resources,
});
export default connect(mapPropsToState, {
  getFilm,
  isFavorite,
  removeFav,
})(Vehicle);
