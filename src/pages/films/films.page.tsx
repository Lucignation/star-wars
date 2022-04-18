import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IFilm } from '../../common/interfaces/IFilm';

//importing files
import Film from '../../components/film/film.component';
import { Store } from '../../store/types';
import Search from '../../components/search/search.component';

//CSS styles
import './films.page.css';

type props = {
  isLoading: boolean;
  films: Array<IFilm>;
};

const Films: React.FC<props> = ({ isLoading, films }) => {
  const [search, setSearch] = useState<string>('');
  let filterFilms = films.filter(({ title }) => {
    return title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });
  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <div className='film-container'>
        {filterFilms.length === 0 ? (
          <p>No search matched. </p>
        ) : (
          filterFilms.map((film, index) => <Film key={index} film={film} />)
        )}
      </div>
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  films: state.resources.films,
});

export default connect(mapPropsToState)(Films);
