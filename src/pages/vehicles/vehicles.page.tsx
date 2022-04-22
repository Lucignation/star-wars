import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

//imports fro folders
import { getVehicles } from '@/store/actions';
import Vehicle from '@/components/vehicle/vehicle.component';
import { IVehicle } from '@/common/interfaces/IVehicle';
import Search from '@/components/search/search.component';
import { Store } from '@/store/types';
import Spinner from '@/utils/Spinner/Spinner';

//CSS styles
import './vehicles.page.css';

type props = {
  getVehicles: any;
  isLoading: boolean;
};

const Vehicles: React.FC<props> = ({ getVehicles, isLoading }) => {
  const [_vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>('');
  const [toast, setToast] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      const res = await getVehicles();
      setVehicles(res);
    };
    fetch();
  }, [getVehicles]);

  //remove the toast in 2 secs
  setTimeout(() => {
    if (toast) {
      setToast('');
    }
  }, 2000);

  //filter vehicles
  let filterVehicle = _vehicles.filter(({ name }) => {
    return name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <AnimatePresence>
            {toast && (
              <motion.div
                key='toast'
                layout
                initial={{ opacity: 0, y: 60, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 60, scale: 0.5 }}
              >
                <p className='toast'>{toast}</p>{' '}
              </motion.div>
            )}
          </AnimatePresence>
          <Search search={search} setSearch={setSearch} />
          {_vehicles.length === 0 ? (
            <p>There are no vehicles to show for now.</p>
          ) : (
            <div className='vehicles-container'>
              {filterVehicle.length === 0 ? (
                <p>No search matched.</p>
              ) : (
                filterVehicle.map((vehicle, index) => (
                  <Vehicle key={index} vehicle={vehicle} showToast={setToast} />
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapPropsToState = (state: Store) => ({
  isLoading: state.resources.isLoading,
  favorite: state.resources.favorite,
});

export default connect(mapPropsToState, { getVehicles })(Vehicles);
