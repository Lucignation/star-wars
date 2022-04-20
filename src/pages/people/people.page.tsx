import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Store } from '../../store/types';

//import from folders
import PeopleComponent from '../../components/people/people.component';
import Search from '../../components/search/search.component';
import { getPeople } from '../../store/actions';
import { IPeople } from '../../common/interfaces/IPeople';

//CSS styles
import './people.page.css';
import Spinner from '../../utils/Spinner/Spinner';

type myProps = {
  isLoading: boolean;
  getPeople: any;
};

const People: React.FC<myProps> = ({ isLoading, getPeople }) => {
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState<IPeople[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const peopleRes = await getPeople();
      setPeople(peopleRes);
    };

    fetch();
  }, [getPeople]);

  //filter people
  let filterPeople = people.filter(({ name }) => {
    return name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      {isLoading && people.length === 0 ? (
        <Spinner />
      ) : people.length === 0 ? (
        <p>There are no people to show for now.</p>
      ) : (
        <div className='people-container'>
          {filterPeople.length === 0 ? (
            <p>No search matched. </p>
          ) : (
            filterPeople?.map((person, index) => (
              <PeopleComponent person={person} key={index} />
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
