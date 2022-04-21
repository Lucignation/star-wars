import { FC } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { Store } from '@/store/types';
import Link from '@/components/link/link.component';
import {
  getFilm,
  removeFav,
  isFavorite,
  getStarship,
  getPlanet,
} from '@/store/actions';

//CSS styles
import './poeplePage.page.css';
import Button from '@/components/button/button.component';
import Spinner from '@/utils/Spinner/Spinner';
import { IPeople } from '@/common/interfaces/IPeople';

type props = {
  getFilm: any;
  removeFav: any;
  isFavorite: (fav: boolean) => void;
  getStarship: any;
  getPlanet: any;
};

const PeoplePage: FC<props> = ({
  getFilm,
  removeFav,
  isFavorite,
  getStarship,
}) => {
  const navigate = useNavigate();
  const person = useSelector((person: Store) => person.resources);

  //load selected film page
  const handleSelectedFilm = async (film: string) => {
    const filmNum: number = parseInt(film.split('/')[5]); //selected film number
    const res = await getFilm(filmNum);
    navigate(`/films/${res.title}`);
  };

  //go back
  const handleBackBtn = () => {
    navigate(-1);
  };

  //fav a person
  const handleFavorite = (person: IPeople) => {
    if (favoriteList.some((item: any) => item.name === person.name)) {
      removeFav(person);
      isFavorite(false);
    } else {
      favoriteList.push(person);
      isFavorite(true);
    }
  };

  //load selected starship page
  const handleSelectedStarShip = async (ship: string) => {
    const shipNum: number = parseInt(ship.split('/')[5]); //selected film number
    const res = await getStarship(shipNum);
    navigate(`/starships/${res.name}`);
  };

  //selected planet
  const planetSelected = async (planet: string) => {
    const planetNum: number = parseInt(planet.split('/')[5]);
    const res = await getPlanet(planetNum);
    navigate(`/planets/${res.name}`);
  };

  const {
    name,
    height,
    mass,
    films,
    gender,
    hair_color,
    skin_color,
    species,
    starships,
    eye_color,
    homeworld,
    vehicles,
    birth_year,
    created,
    edited,
  } = person.people;

  const { isLoading, favoriteList } = person;
  return (
    <div className='people-page-container'>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div onClick={() => handleBackBtn()}>
            <Button title='Back' />
          </div>
          <div className='title-halves'>
            <h2>{name}</h2>

            <div
              onClick={() => handleFavorite(person.people)}
              className='fav-icons'
            >
              {favoriteList.some((item: any) => item.name === name) ? (
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

          <div>
            <small>Created: {created}</small>
            <small>Edited: {edited}</small>
          </div>

          <div className='quarter'>
            <p>Hair: {hair_color}</p>
            <p>Skin: {skin_color}</p>
            <p>Height: {height}</p>
          </div>

          <div className='quarter'>
            <p>Mass: {mass}</p>
            <p>Gender: {gender}</p>
            <p>Eyes: {eye_color}</p>
          </div>

          <div className='quarter'>
            <p>Mass: {mass}</p>
            <p>Birthday: {birth_year}</p>
            <div
              onClick={() => planetSelected(homeworld)}
              className='quarter-link'
            >
              <Link title='Home World' linkType='secondeary-link' />
            </div>
          </div>

          <div className='people-page-links'>
            {films.map((film: string, index: number) => (
              <div key={index} onClick={() => handleSelectedFilm(film)}>
                <Link title={`Film ${index + 1}`} />
              </div>
            ))}
          </div>

          <div>
            {starships.map((ship: string, index: number) => (
              <div key={index} onClick={() => handleSelectedStarShip(ship)}>
                <Link title={`Film ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(null, {
  getFilm,
  removeFav,
  isFavorite,
  getStarship,
  getPlanet,
})(PeoplePage);
