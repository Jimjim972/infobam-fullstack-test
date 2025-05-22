"use client";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Vehicle } from "../../../types/Vehicle";

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/vehicles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setVehicle(data))
      .catch(() => setVehicle(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!vehicle) return notFound();

  
  return (
    <main className="min-h-screen flex flex-col px-4 py-8">
        <div className="flex w-full max-w-xl mb-4">
                <button
            onClick={() => router.back()}
            className="flex mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-600 text-gray-700"
            >
            ← Retour
            </button>
        </div>
        <div className="flex flex-col items-center justify-center ">
            <div className="items-center justify-center p-6">
                <h1 className="text-3xl text-center font-bold mb-4">Détails du véhicule</h1>  
                <div className="max-w-xl bg-white rounded-lg shadow p-6">
                  {vehicle.images.length > 1 ? (
                    <div className="w-full mb-4 flex gap-2 overflow-x-auto">
                      {vehicle.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${vehicle.manufacturer} ${vehicle.model} photo ${idx + 1}`}
                          className="h-40 w-auto object-cover rounded border"
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={vehicle.images[0]}
                      alt={`${vehicle.manufacturer} ${vehicle.model}`}
                      className="w-full h-64 object-cover rounded mb-4"
                    />
                  )}
                  <h1 className="text-2xl font-bold mb-2">
                    {vehicle.manufacturer} {vehicle.model} ({vehicle.year})
                  </h1>
                  <p className="mb-2 text-gray-600">{vehicle.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-black">{vehicle.type}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-black">{vehicle.fuelType}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-black">{vehicle.transmission}</span>
                  </div>
                    <div className="text-gray-600 mb-2">
                        <strong>Caractéristiques :</strong>
                        {vehicle.features.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {vehicle.features.map((feature, index) => (
                                    <li key={index} className="text-gray-600">{feature}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucune caractéristique disponible.</p>
                        )}
                    </div>
                  <p className="text-blue-700 font-semibold text-xl mb-2">{vehicle.price} €</p>
                  <div className="text-xs text-gray-400">
                    Dernière mise à jour : {new Date(vehicle.updatedAt).toLocaleDateString()}
                  </div>
                    <div className="text-xs text-gray-400">
                        Ajouté le : {new Date(vehicle.createdAt).toLocaleDateString()}
                    </div>
                </div>
                
            </div>

        </div>
       
    </main>
  );
}