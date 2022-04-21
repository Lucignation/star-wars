import React from 'react';

import './footer.component.css';

const Footer: React.FC = () => {
  const date = new Date();
  return (
    <div className='footer'>
      {date.getFullYear()} &copy; <span className='footer-logo'>Star Wars</span>{' '}
      Gerald
    </div>
  );
};

export default Footer;
