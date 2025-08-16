import React, { useEffect, useState } from "react";

import moment from 'moment';
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../../redux/auth";
import Spinner from "../components/Spinner";

const YourVehical = () => {
  const [products, setProducts] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [renterIds, setRenterIds] = useState([]);
  const [carIds, setCarIds] = useState([]);
  const [checkoutDetsils, setCheckoutDetsils] = useState([]);
  const [bookedvehicle, setBookedvehicle] = useState([]);
  const [userdetails, setUserdetails] = useState([]);

  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const userId = user?.userData?._id;
  console.log(userId);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/detail/getCarDetails')
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        console.log(data);  // Log the data structure

        // Assuming data is an array of objects with a userId property
        const userProducts = data.filter(product => product.userId === userId);

        setProducts(userProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [userId]);
  // console.log(products);


  const productIds = products.map(product => product._id);
  console.log("Product IDs:", productIds);

  useEffect(() => {
    if (productIds.length > 0 && paymentDetails.length === 0) {
      FetchPaymentDetial();
    }
  }, [productIds, paymentDetails]);
  console.log(paymentDetails);

  const FetchPaymentDetial = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders/findByCarId", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ productIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Request failed: ${errorData.message}`);
      }
      const order = await response.json();
      console.log(order.payments);

      const paymentCarIds = order.payments.map(payment => payment.carId);
      setPaymentDetails(order.payments);

      const userIds = order.payments.map(rent => rent.userId);
      setRenterIds(userIds);
      setCarIds(paymentCarIds);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(renterIds);

  console.log(carIds);

  // fetch car details :- 
  useEffect(() => {
    if (carIds.length > 0) {
      fetchCheckoutDetails(carIds);
      fetchCarDetails(carIds);
    }
    if (renterIds.length > 0) {
      fetchUserDetails(renterIds);
    }
  }, [carIds, renterIds]);

  console.log(carIds);
  const fetchCarDetails = async (carIds) => {
    try {
      const response = await fetch("http://localhost:3000/api/orders/findCarDetailsBYCarId", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ carIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Request failed: ${errorData.message}`);
      }

      const order = await response.json();
      console.log(order);
      setBookedvehicle(order.cars);
    } catch (error) {
      console.log("Error in fetchCarDetails:", error);
    }
  }

  const fetchCheckoutDetails = async (carIds) => {
    try {
      const response = await fetch("http://localhost:3000/api/checkout/getmulticheckoutDetial", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ carIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Request failed: ${errorData.message}`);
      }

      const products = await response.json();
      console.log(products);
      setCheckoutDetsils(products.products);
      console.log(checkoutDetsils);
    } catch (error) {
      console.log("Error in fetchCarDetails:", error);
    }
  }

  console.log(checkoutDetsils);

  const fetchUserDetails = async (renterIds) => {
    console.log(renterIds);
    try {
      const response = await fetch("http://localhost:3000/api/orders/findUserDetails", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ renterIds }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Request failed: ${errorData.message}`);
      }
      const userdetail = await response.json();
      console.log(userdetail.userDetail);
      setUserdetails(userdetail.userDetail)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }
  console.log(userdetails);


  const availableProducts = products.filter(product => !carIds.includes(product._id));
  console.log(availableProducts);
  // const startDate = "2024-07-08"
  // console.log(moment(startDate).format('DD-MM-YYYY'));
  return (
    <div className="flex">
      <Sidebar />
      <div className="mx-auto shadow-md rounded-md my-0 w-4/5 p-4">
        {/* <h2 className="text-3xl text-center font-semibold mb-14 text-black">
          Your Vehicle
        </h2> */}
        {loading ? (
          <div><Spinner /></div>
        ) : (
          <div>
            {availableProducts.length === 0 && (
              <p className="text-center text-[26px] text-red-500 font-semibold">No available vehicles.</p>
            )}
            {availableProducts.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold mb-2 mx-auto flex justify-center">Available Vehicles</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-y-10 ">
                  {availableProducts.map(product => (
                    <div key={product.id} className="bg-white flex flex-col w-fit shadow-lg mx-[50px] my-[0px] py-[15px] px-[24px]
            items-center justify-center rounded-md overflow-hidden ">
                      <div >
                        <div>
                          <img className="w-80 h-48 mt-5 object-cover rounded-md items-center"
                            src={`http://localhost:3000/uploads/${product.photo1}`}
                            alt={product.vehicleName} />
                        </div>
                        <div className="p-4 ">
                          <h2 className="text-xl font-semibold mb-2">
                            Name : {product.vehicleName}
                          </h2>
                          <h2 className="text-xl font-semibold mb-2">
                            Model: {product.vehicleModel}
                          </h2>
                          <h2 className="text-xl font-semibold mb-2">
                            Fuel Type: {product.fuelType}
                          </h2>
                          <h2 className="text-xl font-semibold mb-8">
                            Transmission Type: {product.transmissionType}
                          </h2>
                          <div className="flex justify-center ">
                            <Link to={`/admin/vehicleDetail/${product._id}`} className="bg-black text-white py-2 px-5  rounded-md hover:bg-gray-700 focus:outline-none">
                              View Vehicle
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bookedvehicle.length === 0 && (
              <p className="text-center text-2xl text-red-500 font-semibold mt-10">No booked vehicles.</p>
            )}
            {bookedvehicle.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold mb-10 mx-auto flex justify-center mt-2">Booked Vehicles</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 ">
                  {bookedvehicle.map(product => (
                    <div key={product.id} className="bg-white flex flex-col w-fit shadow-lg mx-[50px] my-[0px] py-[15px] px-[24px]
            items-center justify-center rounded-md overflow-hidden ">
                      <div >
                        <div>
                          <img className="w-80 h-48 mt-5 object-cover rounded-md items-center"
                            src={`http://localhost:3000/uploads/${product.photo1}`}
                            alt={product.vehicleName} />
                        </div>
                        <div className="p-4 ">
                          <h2 className="text-xl font-semibold mb-2">
                            Name: <span className='text-lg'> {product.vehicleName}</span>
                          </h2>
                          <h2 className="text-xl font-semibold mb-2">
                            Model: <span className='text-lg'>{product.vehicleModel}</span>
                          </h2>
                          <h2 className="text-xl font-semibold mb-2">
                            Transmission Type: <span className='text-lg'>{product.transmissionType}</span>
                          </h2>
                          {paymentDetails.map(payment => (
                            payment.carId === product._id && (
                              <div key={payment._id}>
                                <div className="text-gray-600 mb-1 flex items-baseline">
                                  <p className="text-black text-xl font-semibold mr-1">Payment Method: </p>
                                  <span className='text-lg'>{payment.paymentMethod}</span>
                                </div>
                                <div className="text-gray-600 mb-1 flex items-baseline">
                                  <p className="text-black text-xl font-semibold mr-1">Amount Paid: </p>
                                  <span className='text-lg'>{payment.amount}</span>
                                </div>
                              </div>
                            )
                          ))}
                          {checkoutDetsils.map((checkout) => (
                            checkout.carId === product._id && (
                            <div key={user._id} className="flex flex-col items-center">
                              <div className=" rounded-md w-full"><div className="text-gray-600 mb-1 flex items-baseline">
                                <p className="text-black text-xl font-semibold mr-1">Starting Date :- </p>
                                <span className='text-lg'> {moment(checkout.startDate).format('DD-MM-YYYY')}</span>
                              </div>
                                <div className="text-gray-600 mb-1 flex items-baseline">
                                  <p className="text-black text-xl font-semibold mr-1">Ending Date :- </p>
                                  <span className='text-lg'>{moment(checkout.endDate).format('DD-MM-YYYY')}</span>
                                </div>
                                
                                <p className="text-gray-600"></p>
                              </div>
                            </div>
                          )
                          ))}
                          {userdetails.map((user) => (
                            <div key={user._id} className="flex flex-col items-center ">
                              <div className="text-center mb-2">
                                <h3 className="text-lg font-semibold">User Details</h3>
                              </div>
                              <div className=" rounded-md w-full"><div className="text-gray-600 mb-1 flex items-baseline">
                                <p className="text-black text-xl font-semibold mr-1">Name :- </p>
                                <span className='text-lg'>{user.name}</span>
                              </div>
                                <div className="text-gray-600 mb-1 flex items-baseline">
                                  <p className="text-black text-xl font-semibold mr-1">Email :- </p>
                                  <span className='text-lg'>{user.email}</span>
                                </div>
                                <div className="text-gray-600 mb-3 flex items-baseline">
                                  <p className="text-black text-xl font-semibold mr-1">Phone no  :- </p>
                                  <span className='text-lg'>{user.phoneNo}</span>
                                </div>
                                <p className="text-gray-600"></p>
                              </div>
                            </div>
                          ))}

                          
                          <div className="flex justify-center ">
                            {/* <Link to={`/admin/vehicleDetail/${product._id}`} className="bg-black text-white py-2 px-5  rounded-md hover:bg-gray-700 focus:outline-none">
                      View Vehicle
                    </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};

export default YourVehical;
