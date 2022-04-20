import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import Navbar from '../navbar/navbar.component';
import Sidebar from '../sidebar/sidebar.component';

//CSS style
import './header.component.css';

// type props={
//   isOpen: boolean
// }

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <header className='header'>
        <a href='/' className='logo'>
          STAR WARS
        </a>
        <div className='navbar-desktop'>
          <Navbar />
        </div>
        <div className='navbar-mobile'>
          <Sidebar />
        </div>
      </header>
    </>
  );
};

export default Header;
