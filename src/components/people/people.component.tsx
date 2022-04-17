import React from 'react';

//interfaces
import { IPeople } from '../../common/interfaces/IPeople';

//CSS styles
import './people.component.css';

type myProps = {
  person: IPeople;
};

const PeopleComponent: React.FC<myProps> = ({ person }) => {
  console.log(person);
  return (
    <div className='card'>
      <h2>Name: {person.name}</h2>
      <div>
        <h4>Eyes Color: {person.eye_color}</h4>
        <h4>Hair Color: {person.hair_color}</h4>
      </div>

      <div>
        <h4>Height: {person.height}</h4>
        <h4>Mass: {person.mass}</h4>
      </div>
    </div>
  );
};

export default PeopleComponent;
