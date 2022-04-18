import React from 'react';

//CSS styles
import './button.component.css';

type props = {
  title: string;
};
const Button: React.FC<props> = ({ title }) => {
  return (
    <div className='back-btn'>
      <p>{title}</p>
    </div>
  );
};

export default Button;
