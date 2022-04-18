import React from 'react';

//CSS styles
import './link.component.css';

type props = {
  title: string;
  linkType?: string;
};
const Link: React.FC<props> = ({ title, linkType }) => {
  return (
    <div
      className={
        linkType === 'primary-link' ? 'primary-link' : 'secondeary-link'
      }
    >
      <p>{title}</p>
    </div>
  );
};

export default Link;
