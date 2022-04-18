import React from 'react';
import { NavLink, useLocation, useMatch } from 'react-router-dom';

//CSS styles for navigation
import './navbar.component.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  let filmMatch = useMatch('/films/:id');
  console.log(location);
  console.log(filmMatch);
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
        className={location.pathname === '/people' ? 'active-navbar' : ''}
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
        className={location.pathname === '/vehicles' ? 'active-navbar' : ''}
      >
        Vehicles
      </NavLink>
    </nav>
  );
};

export default Navbar;
