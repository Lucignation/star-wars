import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Store } from '../../store/types';

//import from folders
import PeopleComponent from '../../components/people/people.component';
import Search from '../../components/search/search.component';

//CSS styles
import './people.page.css';

type myProps = {
  resources: Store;
};

const People: React.FC<myProps> = ({ resources }) => {
  const [search, setSearch] = useState('');
  const { allPeople } = resources;
  console.log(allPeople);

  let filterPeople = allPeople.filter(({ name }) => {
    return name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });
  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <div className='people-container'>
        {filterPeople?.map((person, index) => (
          <PeopleComponent person={person} key={index} />
        ))}
      </div>
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  resources: state.resources,
});

export default connect(mapPropsToState)(People);
