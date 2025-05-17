

import React from "react";
import { Vehicle } from "../../types/vehicle";
import VehicleCard from "./VehicleCard";

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  if (!vehicles.length) {
    return <div className="text-center py-8">Aucun véhicule trouvé.</div>;
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehicleList;