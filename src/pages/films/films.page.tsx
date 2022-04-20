import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//importing files
import Film from '../../components/film/film.component';
import { Store } from '../../store/types';
import { IFilm } from '../../common/interfaces/IFilm';
import Search from '../../components/search/search.component';

//CSS styles
import './films.page.css';
import { getFilms, isFavorite } from '../../store/actions';
import Spinner from '../../utils/Spinner/Spinner';

type props = {
  isLoading: boolean;
  getFilms: any;
  allFilms: Array<IFilm>;
  isFavorite: (fav: boolean) => void;
  isFav: boolean;
};

const Films: React.FC<props> = ({
  isLoading,
  getFilms,
  allFilms,
  isFavorite,
  isFav,
}) => {
  const [search, setSearch] = useState<string>('');

  const [films, setFilms] = useState<IFilm[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const filmRes = await getFilms();
      setFilms(filmRes);
    };

    fetch();

    //cleanup
    return () => {
      setFilms([]);
    };
  }, []);

  const handleFilmFaved = (film: IFilm, index: number) => {
    if (films.indexOf(film) === index) {
      isFavorite(!isFav);
    }
    console.log(film, index);
  };

  let filterFilms = films.filter(({ title }) => {
    return title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      {isLoading && films.length === 0 ? (
        <Spinner />
      ) : films.length === 0 ? (
        <p>There are no films to show for now.</p>
      ) : (
        <div className='film-container'>
          {filterFilms.length === 0 ? (
            <p>No search matched. </p>
          ) : (
            filterFilms.map((film, index) => <Film key={index} film={film} />)
          )}
        </div>
      )}
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  allFilms: state.resources.films,
  isFav: state.resources.favorite,
});

export default connect(mapPropsToState, { getFilms, isFavorite })(Films);
