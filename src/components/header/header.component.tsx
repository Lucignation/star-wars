import React from 'react';
import Navbar from '../navbar/navbar.component';

//CSS style
import './header.component.css';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <a href='/'>Logo</a>
      <Navbar />
    </header>
  );
};

export default Header;
