import React from "react";
import { Vehicle } from "@/types/Vehicle";
import VehicleCard from "./VehicleCard";
import VehicleListHeader from "./VehicleListHeader";

interface VehicleListProps {
  vehicles: Vehicle[];
  page: number;
  setPage: (page: number) => void;
  loading: boolean;
  manufacturers: string[];
  selectedManufacturer: string;
  onManufacturerChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  page,
  setPage,
  loading,
  manufacturers,
  selectedManufacturer,
  onManufacturerChange,
  sortBy,
  onSortChange,
}) => {
  if (!vehicles.length && !loading) {
    return <div className="text-center py-8">Aucun véhicule trouvé.</div>;
  }

  return (
    <div>
      <VehicleListHeader
        manufacturers={manufacturers}
        selectedManufacturer={selectedManufacturer}
        onManufacturerChange={onManufacturerChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 my-8 w-full">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded text-black bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="text-lg text-black font-semibold">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded text-black bg-gray-200 hover:bg-gray-300"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default VehicleList;