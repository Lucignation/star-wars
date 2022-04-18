import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//imports fro folders
import { getVehicles } from '../../store/actions';
import Vehicle from '../../components/vehicle/vehicle.component';
import { IVehicle } from '../../common/interfaces/IVehicle';

type props = {
  getVehicles: any;
};

const Vehicles: React.FC<props> = ({ getVehicles }) => {
  const [_vehicles, setVehicles] = useState<IVehicle[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getVehicles();
      setVehicles(res);
    };
    fetch();
  }, []);

  console.log(_vehicles);

  return (
    <div>
      {_vehicles.map((vehicle, index) => (
          <Vehicle key={index} vehicle={vehicle} />
        ))}
    </div>
  );
};

export default connect(null, { getVehicles })(Vehicles);
