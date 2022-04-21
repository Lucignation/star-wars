import { FC, useState } from 'react';

//CSS styles
import './Rating.css';

type props = {
  rate: number;
};
export const StarRating: FC<props> = ({ rate }) => {
  const [rating, setRating] = useState(rate);
  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={index <= rating ? 'on' : 'off'}
            // onClick={() => setRating(index)}
          >
            <span className='star'>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
