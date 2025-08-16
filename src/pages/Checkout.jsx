import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Checkout = () => {

  const { id } = useParams();
  console.log(id);

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    startDate: "",
    endDate: "",
    numberOfDays: 0,
    carId: ""
  });

  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  console.log(bookingDetails);

  useEffect(() => {
    console.log("Setting userId:", id);
    setBookingDetails((prevData) => ({
      ...prevData,
      carId: id
    }));
    ProductDetails()
    console.log("User:", bookingDetails);
  }, [id]);

  
  const ProductDetails = async (req, res) => {
    try {
      const response = await fetch(`http://localhost:3000/api/checkout/getCheckoutProduct/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json"
        },
      });

      const products = await response.json();
      console.log(products.product);
      setProduct(products.product);


    } catch (error) {
      console.log("Error in find Product in checkout details");
    }
  }
  // console.log(product.startDate);


  const handleCheckout = async (req, res) => {

    if (
      !bookingDetails.name ||
      !bookingDetails.email ||
      !bookingDetails.phone ||
      !bookingDetails.address ||
      !bookingDetails.startDate ||
      !bookingDetails.endDate ||
      bookingDetails.numberOfDays <= 0
    ) {
      toast.error("Please fill in all required details.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/checkout/bookingDetail", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(bookingDetails),
      });


      if (response.ok) {
        console.log(bookingDetails);
        const data = await response.json();
        const checkoutId = data.data._id;

        navigate(`/payment/${checkoutId}`);
        console.log(checkoutId);

        console.log("data submited");


      } else {

      }
    } catch (error) {
      console.log("error in contact form " + error);
    }
    console.log("Booking Details:", bookingDetails);

  };


  const calculateNumberOfDays = () => {
    const { startDate, endDate } = bookingDetails;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        numberOfDays: (differenceInDays),
      }));
    }
  };

  // const isDateDisabled = (date) => {
  //   return date >= startDate && date <= endDate;
  // };
  // console.log(startDate);

  // const handleStartDateChange = (date) => {
  //   if (isDateDisabled(date)) {
  //     alert('This date is unavailable for booking.');
  //     return;
  //   }
  //   setBookingDetails({
  //     ...bookingDetails,
  //     startDate: date,
  //   });
  // };

  const isDateDisabled = (date) => {
    const d = new Date(date);
    return d >= new Date(product.startDate) && d <= new Date(product.endDate);
  };

  
  const handleStartDateChange = (event) => {
    const date = event.target.value;
    if(product){
      if (isDateDisabled(date)) {
        alert('This date is unavailable for booking.');
        return;
      }
    }
  
   
    setBookingDetails({
      ...bookingDetails,
      startDate: date,
    });
  };

  
  const handleEndDateChange = (event) => {
    const date = event.target.value;
    if(product){
      if (isDateDisabled(date)) {
        alert('This date is unavailable for booking.');
        return;
      }
    }
    setBookingDetails({
      ...bookingDetails,
      endDate: date,
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <Navbar />
      <div className="flex-1 w-11/12 mx-auto h-full p-8">
        <p className="text-4xl font-semibold text-center mb-4">
          Checkout Page
        </p>
        <hr className="my-4" />
        <div className="mt-8 items-center mx-auto  w-5/12 bg-white p-4 rounded-md mb-8 shadow-md">
          {/* User Details Card */}
          <div className="bg-white p-4 rounded-md mb-8 shadow-md ">
            <h3 className="text-xl font-semibold mb-4">User Details</h3>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={bookingDetails.name}
                onChange={handleChange}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={bookingDetails.email}
                onChange={handleChange}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Phone No:
              </label>
              <input
                type="text"
                name="phone"
                value={bookingDetails.phone}
                onChange={handleChange}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Address:
              </label>
              <textarea
                name="address"
                value={bookingDetails.address}
                onChange={handleChange}
                className="w-80 p-1 border rounded-md"
              />
            </div>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white p-4 rounded-md shadow-md flex-1">
            <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                value={bookingDetails.startDate}
                min={today}
                onChange={handleStartDateChange}
                onBlur={calculateNumberOfDays}
                filterDate={(date) => !isDateDisabled(date)}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                value={bookingDetails.endDate}
                min={bookingDetails.startDate}
                onChange={handleEndDateChange}
                onBlur={calculateNumberOfDays}
                className="w-80 p-1 border rounded-md"
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-lg mr-4 font-medium text-gray-700">
                Number of Days:
              </label>
              <input
                type="text"
                value={bookingDetails.numberOfDays}
                readOnly
                className="w-80 p-1 border rounded-md"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleCheckout}
            className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;