import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//imports fro folders
import { getVehicles } from '../../store/actions';
import Vehicle from '../../components/vehicle/vehicle.component';
import { IVehicle } from '../../common/interfaces/IVehicle';
import Search from '../../components/search/search.component';

type props = {
  getVehicles: any;
};

const Vehicles: React.FC<props> = ({ getVehicles }) => {
  const [_vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      const res = await getVehicles();
      setVehicles(res);
    };
    fetch();
  }, []);

  console.log(_vehicles);

  let filterVehicle = _vehicles.filter(({ name }) => {
    return name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      {filterVehicle.map((vehicle, index) => (
        <Vehicle key={index} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default connect(null, { getVehicles })(Vehicles);
