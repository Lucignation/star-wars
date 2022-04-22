import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { connect } from 'react-redux';

//importing files
import Film from '@/components/film/film.component';
import { Store } from '@/store/types';
import { IFilm } from '@/common/interfaces/IFilm';
import Search from '@/components/search/search.component';

//CSS styles
import './films.page.css';
import { getFilms, isFavorite } from '@/store/actions';
import Spinner from '@/utils/Spinner/Spinner';

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
  const [toast, setToast] = useState<string>('');

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
  }, [getFilms]);

  //remove the toast in 2 secs
  setTimeout(() => {
    if (toast) {
      setToast('');
    }
  }, 2000);

  //filter films
  let filterFilms = films.filter(({ title }) => {
    return title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });

  return (
    <div>
      <AnimatePresence>
        {toast && (
          <motion.div
            key='toast'
            layout
            initial={{ opacity: 0, y: 60, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.5 }}
          >
            <p className='toast'>{toast}</p>{' '}
          </motion.div>
        )}
      </AnimatePresence>
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
            filterFilms.map((film, index) => (
              <Film key={index} film={film} showToast={setToast} />
            ))
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
