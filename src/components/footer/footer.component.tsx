import React from 'react';

import './footer.component.css';

const Footer: React.FC = () => {
  const date = new Date();
  return (
    <div className='footer'>{date.getFullYear()} &copy; Star Wars Gerald</div>
  );
};

export default Footer;
