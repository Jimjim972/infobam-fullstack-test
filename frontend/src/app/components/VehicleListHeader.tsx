import React from "react";

interface VehicleListHeaderProps {
  manufacturers: string[];
  selectedManufacturer: string;
  onManufacturerChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const VehicleListHeader: React.FC<VehicleListHeaderProps> = ({
  manufacturers,
  selectedManufacturer,
  onManufacturerChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row-reverse items-center gap-6 mb-6">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label htmlFor="manufacturer" className="font-medium">
          Fabricant :
        </label>
        <select
          id="manufacturer"
          value={selectedManufacturer}
          onChange={(e) => onManufacturerChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Tous</option>
          {manufacturers.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label htmlFor="sort" className="font-medium">
          Trier par :
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Aucun</option>
          <option value="price">Prix</option>
          <option value="year">Année</option>
        </select>
      </div>
    </div>
  );
};

export default VehicleListHeader;