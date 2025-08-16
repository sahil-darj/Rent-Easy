import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import car1 from "../assest/carimg3.webp";
import car2 from "../assest/bike.jpg";
import car3 from "../assest/carimg3.webp";

const ViewDetail = () => {
  const sampleVehicle = {
    id: "1",
    name: "Range Rover",
    model: "Velar",
    year: "2020",
    type: "Automatic",
    Fuel: "Petrol",
    price: "₹5000",
    deposit: "₹4000",
    address: "Nana Varachha, Surat",
    city: "Surat",
    GPS: "Yes",
    Seats: "4",
    ownerName: "Jay",
    ownerMobile: "1234567890",
    images: [car1, car2, car3],
  };

  const { id } = useParams();
  const vehicle = id === sampleVehicle.id ? sampleVehicle : null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const navigate = useNavigate();

  if (!vehicle) {
    return <div className="text-center">Vehicle not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex-1 p-8">
        {/* <p className="text-4xl font-semibold text-center">Vehicle Detail</p>
        <hr className="my-4" /> */}
        <button
          className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none"
          onClick={() => navigate("/Products")}
        >
          &#8592; Back
        </button>
        <div className="flex mt-20 mx-16">
          <div className="w-1/2 pr-6 relative">
            <img
              src={vehicle.images[currentImageIndex]}
              alt={`${vehicle.name} ${vehicle.model}`}
              className="w-full h-auto object-cover rounded-md"
            />
            {vehicle.images.length > 1 && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`w-3 h-3 mx-1 rounded-full ${
                      currentImageIndex === index ? "bg-black" : "bg-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            )}
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-3xl font-semibold mb-8">{`${vehicle.name} ${vehicle.model}`}</h2>
            <div className="text-lg">
              <p className="mb-4">
                <strong>Model Year:</strong> {vehicle.year}
              </p>
              <p className="mb-4">
                <strong>Seats:</strong> {vehicle.Seats}
              </p>
              <p className="mb-4">
                <strong>Seats:</strong> {vehicle.Seats}
              </p>
              <p className="mb-4">
                <strong>Transmission Type:</strong> {vehicle.type}
              </p>
              <p className="mb-4">
                <strong>Fuel Type:</strong> {vehicle.Fuel}
              </p>
              <p className="mb-4">
                <strong>Deposit Price:</strong> {vehicle.deposit}
              </p>
              <p className="mb-4">
                <strong>GPS Navigation:</strong> {vehicle.GPS}
              </p>
              <p className="mb-4">
                <strong>Address:</strong> {vehicle.address}
              </p>
              <p className="mb-4">
                <strong>City:</strong> {vehicle.city}
              </p>
              <p className="mb-4">
                <strong>Owner Name:</strong> {vehicle.ownerName}
              </p>
              <p className="mb-4">
                <strong>Owner Mobile No:</strong> {vehicle.ownerMobile}
              </p>
            </div>
            <div className="mt-8">
              <Link
                className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                Rent Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
