import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useAuth } from '../redux/auth';
import Spinner from "../components/Spinner";

export default function Orders() {

    const { user } = useAuth();
    const [userData, setUserData] = useState();
    const [car, setCar] = useState([]);
    const [carId, setCarId] = useState('');
    const [Products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    console.log("User:", user);
    useEffect(() => {
        setUserData(user.userData);
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/orders/findByUserId", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(userData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Request failed: ${errorData.message}`);
                }

                setLoading(true);
                const order = await response.json();
                console.log(order.dataExists[0]);
                setCar(order.dataExists);
                console.log("Fetched user data:", order.dataExists[0].carId);
                setCarId(order.dataExists[0].carId);
                setLoading(false);

                if (order.length > 0) {
                    console.log("First user data:", order.dataExists[0].carId);
                    setCar(order);
                    setCarId(order.dataExists[0].carId);
                    console.log(carId);
                    console.log(car);
                } else {
                    console.log("No car data found.");
                }

                const carIds = order.dataExists.map(item => item.carId);
                
                // Send the array of carIds to fetch car details
                fetchCarDetails(carIds);
                

            } catch (error) {
                console.log("Error in orders page:", error);
                setLoading(false);

            }
        };
        if (userData) {
            fetchData();
        }
    }, [userData]);


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

            setLoading(true);
            const order = await response.json();
            console.log("Fetched car data:", order.cars);
            setProducts(order.cars);

            setLoading(false);
        } catch (error) {
            console.log("Error in orders page in fetchcarDetails :", error);
        }

    }

    console.log(Products);
    console.log(car);

    console.log("carid id :" + carId);


    return (
        <div>
            <Navbar />
            <div className='w-11/12 mx-auto mt-16 p-4 mb-20'>

            {loading ? (
                    <div><Spinner /></div>
                ) : (
                    <>
                        {Products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                {Products.map((carDetail, index) => (
                                    <div key={index} className="bg-white p-4 rounded-md shadow-md">
                                        <img src={`http://localhost:3000/uploads/${carDetail.photo1}`} alt={carDetail.name} className="w-full h-52 object-cover mb-4 rounded-md" />
                                        <h3 className="text-3xl font-semibold mb-2">{carDetail.vehicleName} - {carDetail.modelYear}</h3>
                                        <div className="text-gray-600 mb-1 flex items-baseline">
                                            <p className="text-black text-xl font-semibold mr-1">Price: </p>
                                            <span className='text-lg'>{carDetail.price} / day</span>
                                        </div>
                                        <div className="text-gray-600 mb-1 flex items-baseline">
                                            <p className="text-black text-xl font-semibold mr-1">City: </p>
                                            <span className='text-lg'>{carDetail.city}</span>
                                        </div>
                                        {/* Display Payment Details */}
                                        {car
                                            .filter(payment => payment.carId === carDetail._id)
                                            .map(payment => (
                                                <div key={payment._id}>
                                                    <div className="text-gray-600 mb-2 flex items-baseline">
                                                        <p className="text-black text-xl font-semibold mr-1">Payment ID: </p>
                                                        <span className='text-lg'>{payment.razorpay_payment_id}</span>
                                                    </div>
                                                    <div className="text-gray-600 mb-1 flex items-baseline">
                                                        <p className="text-black text-xl font-semibold mr-1">Payment Method: </p>
                                                        <span className='text-lg'>{payment.paymentMethod}</span>
                                                    </div>
                                                    <div className="text-gray-600 mb-3 flex items-baseline">
                                                        <p className="text-black text-xl font-semibold mr-1">Amount: </p>
                                                        <span className='text-lg'>{payment.amount}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        <Link to={`/products`} className="block w-full bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none text-center">
                                            Explore Products
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-xl mt-8 text-gray-500">No products have been booked.</p>

                        )}
                    </>
                )}
            </div >
        </div>
    )
}
