"use client"



import { useState } from "react";

// Define a type for the car
interface Car {
  name: string;
 
}

const Select = () => {
  // States to store selected car and cart details
  const [selectedCar, setSelectedCar] = useState<string>(""); // selectedCar can be a string (name of the car)
  const [cart, setCart] = useState<Car[]>([]); // cart will hold an array of car objects
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Available car options
  const carOptions: Car[] = [
    { name: "Tesla Model 3"  },
    { name: "BMW X5" },
    { name: "Audi A6" },
    { name: "Rolls-Roycce" },
    { name: "Ford Mustang" },
    { name: "Chevrolet Camaro" },
    { name: "Mercedes-Benz C-Class" },
    { name: "Nissan GT-R" },
    { name: "Porsche 911" },
    { name: "Nissan Altima" },
    { name: "CR-V" },
    { name: "All New Terlos" },
    { name: "Koenigsegg" },
    
    
  ];

  // Handle car selection
  const handleCarSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCar(event.target.value);
  };

  // Add selected car to cart
  const addToCart = () => {
    if (selectedCar) {
      const selected = carOptions.find((car) => car.name === selectedCar);
      if (selected) {
        setCart([...cart, selected]); // Add selected car to cart
      }
    }
  };

  // Confirm rental and show payment option
  const handleConfirmation = () => {
    setIsConfirmed(true);
  };

  // Redirect to payment link (replace with actual link)
  const redirectToPayment = () => {
    window.location.href = "/paymentDetail"; // Example payment link (change it to your actual payment link)
  };

  return (
    <div className="bg-[#f8fafc] h-[550px] flex items-center justify-center mb-16">
      <div className="bg-indigo-300 p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Select Your Car</h1>

        {/* Car selection dropdown */}
        <div className="mb-4">
          <label htmlFor="carSelect" className="block text-lg font-semibold text-gray-700">
            Choose a Car
          </label>
          <select
            id="carSelect"
            value={selectedCar}
            onChange={handleCarSelect}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a car
            </option>
            {carOptions.map((car, index) => (
              <option key={index} value={car.name}>
                {car.name} 
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          disabled={!selectedCar}
          className={`w-full p-3 rounded-md ${
            selectedCar ? "bg-blue-500 hover:bg-black-600" : "bg-indigo-700 cursor-not-allowed"
          } text-white mt-4 transition`}
        >
          Add car for rent
        </button>

        {/* Show cart details */}
        {cart.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold">Your Car</h2>
            <ul className="mt-2">
              {cart.map((car, index) => (
                <li key={index} className="text-gray-700">
                {car.name}
                </li>
              ))}
            </ul>

            {/* Confirmation Button */}
            <button
              onClick={handleConfirmation}
              className="w-full bg-green-500 text-white p-3 rounded-md mt-4 hover:bg-green-600 transition"
            >
              Confirm Rental
            </button>
          </div>
        )}

        {/* Show confirmation and payment option */}
        {isConfirmed && (
          <div className="mt-4 text-center">
            <p className="font-semibold text-lg">Rental Confirmed!</p>
            <button
              onClick={redirectToPayment}
              className="w-full bg-yellow-500 text-white p-3 rounded-md mt-4 hover:bg-yellow-600 transition"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;




