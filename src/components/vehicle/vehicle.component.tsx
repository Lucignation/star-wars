import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//import from folders
import { Store } from '../../store/types';
import { IVehicle } from '../../common/interfaces/IVehicle';
import { getFilm } from '../../store/actions';

type props = {
  vehicle: IVehicle;
  getFilm: any;
};
const Vehicle: React.FC<props> = ({ vehicle, getFilm }) => {
  const navigate = useNavigate();

  //a film is selected
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]);
    const res = await getFilm(filmNum);
    console.log(res);
    navigate(`/films/${res.title}`); // navigate to /films/film-title
  };
  return (
    <div>
      <h3>Name: {vehicle.name}</h3>
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
      <div>
        {vehicle.films.map((film, index) => (
          <p key={index} onClick={() => handleSelectedFilm(film)}>
            Film {index + 1}
          </p>
        ))}
      </div>
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  resources: state.resources,
});
export default connect(mapPropsToState, { getFilm })(Vehicle);