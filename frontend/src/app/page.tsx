import Image from "next/image";
import VehicleList from "../app/components/VehicleList";
import { Vehicle, FuelType, VehicleType} from "@/types/Vehicle";
const vehicles : Vehicle[] = [
  {
    id: "1",
    manufacturer: "BMW",
    model: "X5",
    year: 2022,
    type: VehicleType.SUV,
    price: 60000,
    fuelType: FuelType.GASOLINE,
    transmission: "AUTO",
    features: [],
    images: ["https://www.bmw-paris.fr/media/cache/article_image_grande/images/article/image/bmw-x5-64a6d385833aa.jpg.webp"],
    description: "SUV de luxe",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    manufacturer: "Tesla",
    model: "Model 3",
    year: 2023,
    type: VehicleType.ELECTRIC,
    price: 45000,
    fuelType: FuelType.ELECTRIC,
    transmission: "AUTO",
    features: [],
    images: [],
    description: "Berline électrique",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center pt-20">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre site de location de voitures</h1>
        <p className="text-lg text-gray-600">Trouvez la voiture de vos rêves à louer.</p>
      <h3 className="pt-2 flex items-center">Louez votre voiture avec notre partenaire</h3>
      </div>
      <div className="flex flex-col items-center pt-16 min-w-full">
        <VehicleList vehicles={[...vehicles]}></VehicleList>
      </div>
      
    </main>
  );
}
