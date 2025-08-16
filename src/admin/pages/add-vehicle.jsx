import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { toast } from 'react-hot-toast';
import { useAuth } from "../../redux/auth";

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    vehicleName: "",
    vehicleModel: "",
    fuelType: 'petrol',
    transmissionType: 'automatic',
    hasGPS: '',
    seatingCapacity: '',
    modelYear: '',
    photo1: null,
    photo2: null,
    photo3: null,
    location: "",
    price: "",
    depositPrice: "",
    city: "",
    category: "car",
    userId: ""
  });

  const { user } = useAuth();
  useEffect(() => {
    // console.log("User:", user);
    // console.log("Setting userId:", user.userData._id);
    setFormData((prevData) => ({
      ...prevData,
      userId: user.userData._id
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e, photoNumber) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [`photo${photoNumber}`]: file,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.vehicleName ||
      !formData.vehicleModel ||
      !formData.fuelType ||
      !formData.hasGPS ||
      !formData.modelYear ||
      !formData.seatingCapacity ||
      !formData.transmissionType ||
      !formData.photo1 ||
      !formData.photo2 ||
      !formData.photo3 ||
      !formData.location ||
      !formData.price ||
      !formData.depositPrice ||
      !formData.city ||
      !formData.category
    ) {
      toast.error("Please fill in all required fields and select photo", { position: "top-right" });
      return;
    }

    const formdataToSend = new FormData();
    formdataToSend.append("carDetails", JSON.stringify(formData));
    formdataToSend.append("photo1", formData.photo1);
    formdataToSend.append("photo2", formData.photo2);
    formdataToSend.append("photo3", formData.photo3);


    try {
      const response = await fetch('http://localhost:3000/api/add-vehicle', {
        method: 'POST',
        body: formdataToSend,
        });
      // console.log(response);
      const res_data = await response.json();
      console.log(res_data);

      if (response.ok) {
        toast.success("Vehicle details added successfully ");
        setFormData({
          vehicleName: '',
          vehicleModel: '',
          fuelType: '',
          transmissionType: '',
          hasGPS: '',
          seatingCapacity: '',
          modelYear: '',
          photo1: null,
          location: '',
          price: '',
          depositPrice: '',
          city: '',
          category: 'car',
        });
      } else {
        toast.error("Failed to add vehicle detail ");
        console.log("object");
      }
    } catch (error) {
      toast.error("Failed to add vehicle detail ");
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <form className="flex-grow max-w-lg mx-auto my-6 p-4 bg-white shadow-md rounded-md" encType="multipart/form-data">
        <h2 className="text-2xl text-center font-semibold mb-8">Add Vehicle</h2>

        <div className="mb-4">
          <label htmlFor="vehicleName" className="block text-gray-600">
            Vehicle Name
          </label>
          <input
            type="text"
            id="vehicleName"
            name="vehicleName"
            value={formData.vehicleName}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="vehicleModel" className="block text-gray-600">
            Vehicle Model
          </label>
          <input
            type="text"
            id="vehicleModel"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="fuelType" className="block text-gray-700">
            Fuel Type:
          </label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full  p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          >
            <option disabled > setlect Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="transmissionType" className="block text-gray-700">
            Transmission Type:
          </label>
          <select
            id="transmissionType"
            name="transmissionType"
            value={formData.transmissionType}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          >
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="hasGPS" className="block text-gray-700">
            GPS Navigation:
          </label>
          <div className="flex items-center">
            <label htmlFor="hasGPSYes" className="mr-2 mt-3">
              <input
                type="radio"
                id="hasGPSYes"
                name="hasGPS"
                value="yes"
                checked={formData.hasGPS === "yes"}
                onChange={handleChange}
                className="mr-1"
              />
              Yes
            </label>
            <label htmlFor="hasGPSNo" className="mt-3">
              <input
                type="radio"
                id="hasGPSNo"
                name="hasGPS"
                value="no"
                checked={formData.hasGPS === "no"}
                onChange={handleChange}
                className="mr-1"
              />
              No
            </label>
          </div>
        </div>


        <div className="mb-6">
          <label htmlFor="seatingCapacity" className="block text-gray-700">
            Seating Capacity:
          </label>
          <input
            type="number"
            id="seatingCapacity"
            name="seatingCapacity"
            value={formData.seatingCapacity}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter seating capacity"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="modelYear" className="block text-gray-700">
            Model Year
          </label>
          <input
            type="number"
            id="modelYear"
            name="modelYear"
            value={formData.modelYear}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter model year"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="photos" className="block text-gray-600">
            Photo 1
          </label>
          <input
            type="file"
            id="photo1"
            name="photo1"
            // accept="image/*"
            // multiple
            onChange={(e) => handlePhotoChange(e, 1)}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="photos" className="block text-gray-600">
            Photo 2
          </label>
          <input
            type="file"
            id="photo2"
            name="photo2"
            // accept="image/*"
            // multiple
            onChange={(e) => handlePhotoChange(e, 2)}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="photos" className="block text-gray-600">
            Photo 3
          </label>
          <input
            type="file"
            id="photo3"
            name="photo3"
            // accept="image/*"
            // multiple
            onChange={(e) => handlePhotoChange(e, 3)}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="location" className="block text-gray-600">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-600">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="depositPrice" className="block text-gray-600">
            Deposit Price
          </label>
          <input
            type="number"
            id="depositPrice"
            name="depositPrice"
            value={formData.depositPrice}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="city" className="block text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-600">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
