import { FC } from 'react';
import { useSelector } from 'react-redux';

//imports from folders
import { Store } from '@/store/types';

const Favorites: FC = () => {
  const data = useSelector((state: Store) => state.resources);

  const { favoriteList } = data;
  console.log(favoriteList);
  return (
    <div>
      {favoriteList.length === 0 ? (
        <p> You currently do not have any favorite.</p>
      ) : (
        favoriteList.map((fav: any, index: number) => (
          <div key={index}>
            <h4>{fav.name || fav.title}</h4>
            <p>{}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
