import { FC } from 'react';
import { NavLink, useLocation, useMatch } from 'react-router-dom';

//CSS styles
import './backdrop.component.css';

type props = {
  setIsOpen: any;
  isOpen: boolean;
};

const BackDrop: FC<props> = ({ setIsOpen, isOpen }) => {
  const location = useLocation();
  let filmMatch = useMatch('/films/:id');

  return (
    <nav className='back-drop'>
      <NavLink
        to='/'
        className={
          location.pathname === '/'
            ? 'active-navbar back-drop-link'
            : 'back-drop-link'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        Home
      </NavLink>

      <NavLink
        to='/people'
        className={
          location.pathname === '/people'
            ? 'active-navbar back-drop-link'
            : 'back-drop-link'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        People
      </NavLink>

      <NavLink
        to='/films'
        className={
          location.pathname === '/films' ||
          location.pathname === filmMatch?.pathname
            ? 'active-navbar back-drop-link'
            : 'back-drop-link'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        Films
      </NavLink>

      <NavLink
        to='/vehicles'
        className={
          location.pathname === '/vehicles'
            ? 'active-navbar back-drop-link'
            : 'back-drop-link'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        Vehicles
      </NavLink>
    </nav>
  );
};

export default BackDrop;
