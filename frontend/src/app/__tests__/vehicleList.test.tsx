import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import VehicleList from "../components/VehicleList";

const vehicles = [
  {
    id: "1",
    manufacturer: "BMW",
    model: "X5",
    year: 2022,
    type: "SUV",
    price: 60000,
    fuelType: "GASOLINE",
    transmission: "AUTO",
    features: [],
    images: [],
    description: "SUV de luxe",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    manufacturer: "Tesla",
    model: "Model 3",
    year: 2023,
    type: "ELECTRIC",
    price: 45000,
    fuelType: "ELECTRIC",
    transmission: "AUTO",
    features: [],
    images: [],
    description: "Berline électrique",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("VehicleList", () => {
  it("affiche la liste des véhicules", () => {
    render(<VehicleList vehicles={vehicles} />);
    expect(screen.getByText(/BMW/)).toBeInTheDocument();
    expect(screen.getByText(/Tesla/)).toBeInTheDocument();
  });

  it("filtre les véhicules par fabricant", () => {
    render(<VehicleList vehicles={vehicles} />);
    fireEvent.change(screen.getByLabelText(/Fabricant/i), { target: { value: "BMW" } });
    expect(screen.getByText(/BMW/)).toBeInTheDocument();
    expect(screen.queryByText(/Tesla/)).not.toBeInTheDocument();
  });

  it("trie les véhicules par prix", () => {
    render(<VehicleList vehicles={vehicles} />);
    fireEvent.change(screen.getByLabelText(/Trier par/i), { target: { value: "price" } });
    const items = screen.getAllByTestId("vehicle-item");
    expect(items[0]).toHaveTextContent("Tesla");
    expect(items[1]).toHaveTextContent("BMW");
  });
});