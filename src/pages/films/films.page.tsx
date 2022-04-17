import React from 'react';
import { connect } from 'react-redux';
import { IFilm } from '../../common/interfaces/IFilm';

//importing files
import Film from '../../components/film/film.component';
import { Store } from '../../store/types';

//CSS styles
import './films.page.css';

type props = {
  isLoading: boolean;
  films: Array<IFilm>;
};

const Films: React.FC<props> = ({ isLoading, films }) => {
  return (
    <div className='film-container'>
      {films.map((film, index) => (
        <Film key={index} film={film} />
      ))}
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  films: state.resources.films,
});

export default connect(mapPropsToState)(Films);
