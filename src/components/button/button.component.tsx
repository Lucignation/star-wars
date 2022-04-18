import React from 'react';

type props = {
    title: string
}
const Button: React.FC<props> = ({title}) => {
  return (
    <div>
      <p>{title}</p>
    </div>
  );
};

export default Button;
