import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

//import from folders
import PeopleComponent from '@/components/people/people.component';
import Search from '@/components/search/search.component';
import { getPeople } from '@/store/actions';
import { IPeople } from '@/common/interfaces/IPeople';
import { Store } from '@/store/types';

//CSS styles
import './people.page.css';
import Spinner from '@/utils/Spinner/Spinner';

type myProps = {
  isLoading: boolean;
  getPeople: any;
  homePage?: boolean;
};

const People: React.FC<myProps> = ({ isLoading, getPeople, homePage }) => {
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState<IPeople[]>([]);
  const [toast, setToast] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      const peopleRes = await getPeople();
      setPeople(peopleRes);
    };

    fetch();
  }, [getPeople]);

  //remove the toast in 2 secs
  setTimeout(() => {
    if (toast) {
      setToast('');
    }
  }, 2000);

  //filter people
  let filterPeople = people.filter(({ name }) => {
    return name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
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
      {isLoading && people.length === 0 ? (
        <Spinner />
      ) : people.length === 0 ? (
        <p>There are no people to show for now.</p>
      ) : (
        <div
          className={homePage ? 'people-home-container' : 'people-container'}
        >
          {filterPeople.length === 0 ? (
            <p>No search matched. </p>
          ) : (
            filterPeople?.map((person, index) => (
              <PeopleComponent
                person={person}
                key={index}
                showToast={setToast}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  allPeople: state.resources.allPeople,
});

export default connect(mapPropsToState, { getPeople })(People);
