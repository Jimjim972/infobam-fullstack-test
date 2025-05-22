"use client";
import VehicleList from "../app/components/VehicleList";
import { Vehicle } from "@/types/Vehicle";
import React, { useEffect, useState, useMemo } from "react";

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [manufacturer, setManufacturer] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  // Récupère la liste des fabricants pour le header
  const manufacturers = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.manufacturer))),
    [vehicles]
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (manufacturer) params.append("manufacturer", manufacturer);
    if (sortBy) params.append("sortBy", sortBy);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/vehicles?${params.toString()}`
    )
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch(() => setVehicles([]))
      .finally(() => setLoading(false));
  }, [manufacturer, sortBy, page, limit]);

  return (
    <main className="min-h-screen ">
      <div className="flex flex-col items-center justify-center pt-10 px-4 ">
        <div className="w-full bg-primary border border-white rounded-lg p-4 ">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            Bienvenue sur notre site de location de voitures
          </h1>
          <p className="text-base md:text-lg text-gray-600 text-center">
            Trouvez la voiture de vos rêves à louer.
          </p>
          <h3 className="pt-2 text-sm md:text-base items-center text-center">
            Louez votre voiture avec notre partenaire
          </h3>
        </div>
      </div>
     
      <div className="flex flex-col items-center pt-10 pb-10 px-2 sm:px-4 md:px-8">
        <div className="w-full max-w-screen-lg">
          {loading ? (
            <div>Chargement...</div>
          ) : (
            <VehicleList
            vehicles={vehicles}
            page={page}
            setPage={setPage}
            loading={loading}
            manufacturers={manufacturers}
            selectedManufacturer={manufacturer}
            onManufacturerChange={setManufacturer}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          )}
        </div>
      </div>
    </main>
  );
}