// Products.js
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import car from "../assest/carimg3.webp";
import bike from "../assest/bike.jpg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  const [products, setProducts] = useState([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/detail/getCarDetails')
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  console.log(products);

  // Filter products based on search term, category, and city
  const filteredProducts = products.filter((product) => {
    const matchSearchTerm =
      product.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchCity = selectedCity === "all" || product.city === selectedCity;
    return matchSearchTerm && matchCategory && matchCity;
  });
  
  // console.log(filteredProducts);
  // if ( filteredProducts <= 0) {
  //   return <div>Not Found !!</div>;
  // }

  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto mt-16 p-4 mb-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>


            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Cities</option>
              <option value="Surat">Surat</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/4 p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <hr className="my-6 mt-10 mb-12" />
        {loading ? (
          <div><Spinner /></div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={`http://localhost:3000/uploads/${product.photo1}`}
                  alt={product.name}
                  className="w-full h-52 object-cover mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-2">{product.vehicleName} - {product.vehicleModel}</h3>
                <div className="text-gray-600  flex">
                  <p className="text-black font-semibold mr-1">Price:  </p> {product.price}/ day
                </div>
                <div className="text-gray-600 mb-6 flex">
                  <p className="text-black font-semibold mr-1">City:  </p> {product.city}
                </div>
                <Link to={`/productdetail/${product._id}`} className="block w-full bg-black text-white py-2 px-5 rounded-md hover:bg-gray-700 focus:outline-none text-center">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl mt-8 text-black">No products found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
