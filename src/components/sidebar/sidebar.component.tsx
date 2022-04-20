import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';

//import folders
import BackDrop from '../backdrop/backdrop.component';

//CSS Styles
import './sidebar.component.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenSideBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div onClick={() => handleOpenSideBar()} className='sidebar'>
        {isOpen ? (
          <div>
            <IoCloseSharp />
          </div>
        ) : (
          <div>
            <GiHamburgerMenu />
          </div>
        )}
      </div>
      {isOpen && <BackDrop setIsOpen={setIsOpen} isOpen={isOpen} />}
    </>
  );
};

export default Sidebar;
