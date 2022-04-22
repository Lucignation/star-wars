import { FC } from 'react';
import { useSelector } from 'react-redux';

//imports from folders
import { Store } from '@/store/types';

//CSS files
import './favorites.page.css';

const Favorites: FC = () => {
  const data = useSelector((state: Store) => state.resources);

  const { favoriteList } = data;
  console.log(favoriteList);
  return (
    <div className='favorite'>
      {favoriteList.length === 0 ? (
        <p> You currently do not have any favorite.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name/Title</th>
              <th>Episodes/Manufacturer/Hair Color</th>
              <th>Model/Height/Director</th>
            </tr>
          </thead>
          <tbody>
            {favoriteList.map((fav: any, index: number) => (
              <tr key={index}>
                <td>{fav.name || fav.title}</td>
                <td>{fav.episode_id || fav.manufacturer || fav.hair_color}</td>
                <td>{fav.model || fav.height || fav.director}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Favorites;
