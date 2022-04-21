import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

//import from folders
import { Store } from '@/store/types';
import { getPlanet } from '@/store/actions';
import Spinner from '@/utils/Spinner/Spinner';
import Button from '@/components/button/button.component';
import ScrollToTop from '@/utils/ScrollToTop/ScrollToTop'; //takes to the top

//CSS styles
import './film.page.css';

type props = {
  getPlanet: any;
  resources: Store;
};
const Film: React.FC<props> = ({ getPlanet, resources }) => {
  const navigate = useNavigate();

  const { film, isLoading } = resources;

  const handleBackBtn = () => {
    navigate(-1);
  };

  const handleSelectedPlanet = async (planet: string) => {
    const planetNum: number = parseInt(planet.split('/')[5]); //planet number /planet/3
    const res = await getPlanet(planetNum);
    navigate(`/planets/${res.name}`);
  };
  return (
    <div className='card film-card'>
      <ScrollToTop />
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div onClick={() => handleBackBtn()}>
            <Button title='Back' />
          </div>
          <h1 className='film-page-title'>Title: {film?.title}</h1>
          <small className='film-release-date'>
            Release Date:{' '}
            {moment(film?.release_date).format('dddd, MMMM Do YYYY')}
          </small>
          <div className='film-top-description'>
            <p>Director: {film?.director}</p>
            <p>Episode: {film?.episode_id}</p>
          </div>

          <div className='film-description'>
            <h4>Opening Crawl:</h4>
            <p>{film?.opening_crawl}</p>
          </div>

          <div className='film-bottom-description'>
            <small>
              Created:{' '}
              {moment(film?.created).format('dddd, MMMM Do YYYY, h:mm:ss a')}
            </small>
            <small>
              Edited:{' '}
              {moment(film?.edited).format('dddd, MMMM Do YYYY, h:mm:ss a')}
            </small>
          </div>

          <div className='film-planet-grids'>
            {film?.planets.map((planet, index) => (
              <p
                key={index}
                onClick={() => handleSelectedPlanet(planet)}
                className='film-planet-link'
              >
                Planet {index + 1}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  resources: state.resources,
  favorite: state.resources.favorite,
});

export default connect(mapPropsToState, { getPlanet })(Film);
