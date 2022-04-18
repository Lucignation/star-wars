import React from 'react';
import Navbar from '../navbar/navbar.component';

//CSS style
import './header.component.css';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <a href='/' className='logo'>
        STAR WARS
      </a>
      <Navbar />
    </header>
  );
};

export default Header;
