import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const ViewVehicle = () => {

  const [products, setProducts] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/detail/getProduct/ProductById/${id}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        console.log(data); // Optional: Log the data received from the server
        setProducts(data);
        setPhotos([data.photo1, data.photo2, data.photo3].filter(Boolean));
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);
  // console.log(products);+
  // console.log(photos);
  // console.log(products.userId);
  // console.log(userID);

  const deleteProduct = async (req, res) => {
    try {

      // const userID = products.userId;
      const response = await fetch(`http://localhost:3000/api/detail/product/delete/${products._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': "application/json"
        },
      });
      console.log(response);
      const res_data = await response.json();
      console.log(res_data);
      if (response.ok) {
        toast.success("Vehical deleted successfullt");
        navigate('/admin/your-vehicle')

      }

    } catch (error) {
      toast.error("Fail to delete vehicle");
      console.log("Error in deleting data... " + error);
    }
  }

  if (loading) {
    return <div key={id}><Spinner/></div>;
  }

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const goBack = () => {
    window.history.back(); // This will navigate to the previous page
  };

  const photoslength = photos.length;
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <p className="text-4xl font-semibold text-center">Vehicle Detail</p>
        <hr className="my-4" />
        <div className="mt-8">
          {/* <button
            onClick={goBack}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none"
          >
            &#8592; Back
          </button> */}
        </div>
        {loading ?(
          <div><Spinner /></div>
        ):(<div className="flex mt-32 items-center justify-center ml-28">
        <div className="w-1/2 pr-4  relative">
          <img
            src={`http://localhost:3000/uploads/${photos[currentImageIndex]}`}
            alt={`${products.name} ${products.model}`}
            className="w-full h-auto object-cover rounded-md"
          />
          {photoslength > 1 && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mb-2">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`w-3 h-3 mx-1 rounded-full ${currentImageIndex === index ? "bg-black" : "bg-gray-300"
                    }`}
                ></button>
              ))}
            </div>
          )}
        </div>
        <div className="w-1/2 pl-16">
          <h2 className="text-3xl font-semibold mb-8">{`${products.vehicleName} ${products.vehicleModel}`}</h2>
          <div className="text-lg">
            <p className="mb-4">
              <strong>Vehical Model : </strong> {products.vehicleModel}
            </p>
            <p className="mb-4">
              <strong>Fule Type:</strong> {products.fuelType}
            </p>
            <p className="mb-4">
              <strong>Transmission Type:</strong> {products.transmissionType}
            </p>
            <p className="mb-4">
              <strong>GPS Navigation : </strong> {products.hasGPS}
            </p>
            <p className="mb-4">
              <strong>Seating Capacity : </strong> {products.seatingCapacity}
            </p>
            <p className="mb-4">
              <strong>Vehicle Model Year : </strong> {products.modelYear}
            </p>
            <p className="mb-4">
              <strong>Price : </strong> {products.price}
            </p>
            <p className="mb-4">
              <strong>Deposit Price : </strong> {products.depositPrice}
            </p>
            <p className="mb-4">
              <strong>Location : </strong> {products.location}
            </p>
            <p className="mb-4">
              <strong>City : </strong> {products.city}
            </p>
          </div>
          <div className="flex mt-20">
            <Link
              to={`/admin/updateVehical/${products._id}`}
              className="bg-black text-white py-2 px-5 mr-10 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Update
            </Link>
            <button
              onClick={deleteProduct}
              className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      </div>)}
        
      </div>
    </div>
  );
};

export default ViewVehicle;
