import React, { useState } from 'react';

//CSS styles
import './search.component.css';


type props ={
    search: string,
    setSearch: any,
}

const Search: React.FC<props> = ({search, setSearch}) => {
  return (
    <form className='search-container'>
      <input
        type='text'
        placeholder='Search'
        name='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
