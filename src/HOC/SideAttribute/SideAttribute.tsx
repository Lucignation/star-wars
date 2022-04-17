import React from 'react';
import { connect } from 'react-redux';
import { IFilm } from '../../common/interfaces/IFilm';
import { IPeople } from '../../common/interfaces/IPeople';

//importing files
import { getPeople, getFilms } from '../../store/actions';
import { Store } from '../../store/types';

type props = {
  Component: any;
  entity: string;
  people: Array<IPeople> | undefined;
  films?: Array<IFilm>;
};
const SideAttribute: React.FC<props> = ({
  Component,
  entity,
  people,
  films,
}): any => {
  if (entity === 'people') {
    people?.map((person) => <div>{person.name}</div>);
  }

  if (entity === 'films') {
    films?.map((film) => <div>{film.title}</div>);
  }
  const NewComponent = (props: any) => {
    return (
      <div>
        <Component {...props} />
      </div>
    );
  };
  return NewComponent;
};

const mapPropsToState = (state: Store) => ({
  people: state.resources.allPeople,
  films: state.resources.films,
});

export default connect(mapPropsToState, { getPeople, getFilms })(SideAttribute);
