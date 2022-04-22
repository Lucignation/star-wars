import React from 'react';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

//CSS styles for navigation
import './navbar.component.css';

//imports from folders
import { Store } from '@/store/types';

const Navbar: React.FC = () => {
  const location = useLocation();
  const data = useSelector((state: Store) => state.resources);

  let filmMatch = useMatch('/films/:id');
  let planetMatch = useMatch('/planets/:id');
  let peopleMatch = useMatch('/people/:id');
  let vehicleMatch = useMatch('/vehicles/:id');
  let starshipMatch = useMatch('/starships/:id');

  const { favoriteList } = data;

  return (
    <nav className='navbar'>
      <NavLink
        to='/'
        className={location.pathname === '/' ? 'active-navbar' : ''}
      >
        Home
      </NavLink>
      <NavLink
        to='/people'
        className={
          location.pathname === '/people' ||
          location.pathname === peopleMatch?.pathname
            ? 'active-navbar'
            : ''
        }
      >
        People
      </NavLink>
      <NavLink
        to='/films'
        className={
          location.pathname === '/films' ||
          location.pathname === filmMatch?.pathname
            ? 'active-navbar'
            : ''
        }
      >
        Films
      </NavLink>
      <NavLink
        to='/vehicles'
        className={
          location.pathname === '/vehicles' ||
          location.pathname === vehicleMatch?.pathname
            ? 'active-navbar'
            : ''
        }
      >
        Vehicles
      </NavLink>

      <NavLink
        to='/starships'
        className={
          location.pathname === '/starships' ||
          location.pathname === starshipMatch?.pathname
            ? 'active-navbar'
            : ''
        }
      >
        Starships
      </NavLink>

      <NavLink
        to='/favorites'
        className={location.pathname === '/favorites' ? 'active-navbar' : ''}
      >
        Favorites
        {favoriteList.length > 0 && (
          <p
            className={
              location.pathname === '/favorites'
                ? 'fav-count-active'
                : 'fav-count'
            }
          >
            {favoriteList.length}
          </p>
        )}
      </NavLink>
    </nav>
  );
};

export default Navbar;
