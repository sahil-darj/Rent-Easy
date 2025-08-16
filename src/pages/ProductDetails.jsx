import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../redux/auth";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export const ProductDetails = () => {
    const [products, setProducts] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [ownerDetails, setOwnerDetails] = useState({});
    const [loading, setLoading] = useState(true);

    
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);



    const { user , isloggedIn } = useAuth();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/api/detail/getProduct/ProductById/${id}`)
            .then(response => response.json())
            .then(productData => {
                console.log(productData);
                const ownerId = productData.userId;
                setProducts(productData);
                setPhotos([productData.photo1, productData.photo2, productData.photo3].filter(Boolean));


                fetch(`http://localhost:3000/api/detail/getOwner/OwnerById/${ownerId}`)
                    .then(response => response.json())
                    .then(ownerData => {
                        console.log(ownerData);
                        setOwnerDetails(ownerData);
                    })
                    .catch(error => console.error('Error fetching owner details:', error));
            })
            .catch(error => console.error('Error fetching product:', error));
        setLoading(false);
    }, [id]);


    const buttonHandler = ()=>{
        if (!isloggedIn) {
            toast.error("Please log into rentEasy to rent car or bike");
            navigate("/login");
            return;
        }else{
            navigate(`/checkout/${id}`);
        }

    }
    console.log(products);
    console.log(photos);
    console.log(ownerDetails);


    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
    };

    const photoslength = photos.length;
    return (
        <div>
            <Navbar />
            <div className="flex-1 p-8">
                <p className="text-4xl font-semibold text-center">Vehicle Detail</p>
                <hr className="my-4" />
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                    
                <div className="flex mt-10 items-center justify-center ml-28">
                    <div className="w-1/2 pr-4  relative">
                        <img
                            src={`http://localhost:3000/uploads/${photos[currentImageIndex]}`}
                            // alt={`${products.vehicleName} ${products.vehicleModel}`}
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
                        <h2 className="text-3xl font-semibold mb-8">{`${products?.vehicleName} ${products?.vehicleModel}`}</h2>
                        <div className="text-lg">
                            <p className="mb-4">
                                <strong>Vehical Model : </strong> {products?.vehicleModel}
                            </p>
                            <p className="mb-4">
                                <strong>Fule Type:</strong> {products?.fuelType}
                            </p>
                            <p className="mb-4">
                                <strong>Transmission Type:</strong> {products?.transmissionType}
                            </p>
                            <p className="mb-4">
                                <strong>GPS Navigation : </strong> {products?.hasGPS}
                            </p>
                            <p className="mb-4">
                                <strong>Seating Capacity : </strong> {products?.seatingCapacity}
                            </p>
                            <p className="mb-4">
                                <strong>Vehicle Model Year : </strong> {products?.modelYear}
                            </p>
                            <p className="mb-4">
                                <strong>Price : </strong> {products?.price} / day
                            </p>
                            <p className="mb-4">
                                <strong>Deposit Price : </strong> {products?.depositPrice}
                            </p>
                            <p className="mb-4">
                                <strong>Location : </strong> {products?.location}
                            </p>
                            <p className="mb-4">
                                <strong>City : </strong> {products?.city}
                            </p>
                        </div><br />
                        <div>
                            <h2 className="text-2xl font-semibold mb-8">Owner Details :</h2>
                            <p className="mb-4">
                                <strong> Name : </strong> {ownerDetails?.name}
                            </p>
                            <p className="mb-4">
                                <strong>Phone No : </strong> {ownerDetails?.phoneNo}
                            </p>
                        </div>
                        <div className="flex mt-10">
                            <button
                                onClick={buttonHandler}
                                // to={`/checkout/${id}`}
                                className="bg-black text-white py-2 px-5 mr-10 rounded-md hover:bg-gray-700 focus:outline-none"
                            >
                                Rent Now
                            </button>
                        </div>
                    </div>
                </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    )
}
