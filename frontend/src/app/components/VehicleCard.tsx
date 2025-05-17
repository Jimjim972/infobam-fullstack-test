import React from "react";
import { Vehicle } from "../../types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="flex flex-col h-full border rounded-lg p-4 shadow hover:shadow-lg transition-shadow bg-white">
      <div className="w-full aspect-video mb-2 overflow-hidden rounded">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.manufacturer} ${vehicle.model}`}
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-lg font-bold mb-1">
        {vehicle.manufacturer} {vehicle.model}{" "}
        <span className="text-gray-500 font-normal">({vehicle.year})</span>
      </h4>
      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
        <span className="bg-gray-100 px-2 py-1 rounded">{vehicle.type}</span>
        {vehicle.fuelType && (
          <span className="bg-gray-100 px-2 py-1 rounded">
            {vehicle.fuelType}
          </span>
        )}
      </div>
      <p className="text-blue-700 font-semibold text-lg mt-auto">
        {vehicle.price} €
      </p>
    </div>
  );
};

export default VehicleCard;
