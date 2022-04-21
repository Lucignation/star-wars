import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';

//import from folders
import { getStarships } from '@/store/actions';
import Spinner from '@/utils/Spinner/Spinner';
import StarShip from '@/components/starship/starship.component';
import Search from '@/components/search/search.component';

//interface imports
import { IStarship } from '@/common/interfaces/IStarship';

//CSS styles
import './starships.page.css';

type props = {
  getStarships: any;
};
const StarShips: FC<props> = ({ getStarships }) => {
  const [starShip, setStarShip] = useState<IStarship[]>([]);

  const [search, setSearch] = useState<string>('');

  //make a fetch onload
  useEffect(() => {
    const fetch = async () => {
      const res = await getStarships();
      setStarShip(res);
    };

    fetch();

    //cleanup
    return () => setStarShip([]);
  }, [getStarships]);

  //filter StarShips
  let filterStarship = starShip.filter(({ name }) => {
    return name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });
  return (
    <div className='starships-container'>
      <Search search={search} setSearch={setSearch} />
      {starShip.length <= 0 ? (
        <Spinner />
      ) : (
        <div className='starship-grid'>
          {filterStarship.length === 0 ? (
            <p>Search not matched.</p>
          ) : (
            filterStarship.map((ship, index) => (
              <StarShip key={index} starship={ship} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default connect(null, { getStarships })(StarShips);
