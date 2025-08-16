import React from "react";
import { Navbar } from "./Navbar";
import { useState } from "react";
// import ProductCard from "./ProductCard";

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  // Mock data for products
  const products = [
    { id: 1, name: "Audi", category: "Car", city: "Surat" },
    { id: 2, name: "Mercedes", category: "Car", city: "Mumbai" },
    { id: 3, name: "Royal enfield", category: "Bike", city: "Ahmedabad" },
    // Add more products as needed
  ];

  // Filter products based on search term, category, and city
  const filteredProducts = products.filter((product) => {
    const matchSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchCity = selectedCity === "all" || product.city === selectedCity;
    return matchSearchTerm && matchCategory && matchCity;
  });
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-6 p-4">
        {/* Search Bar */}
        <div className="flex items-center justify-end mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/4 p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category and City Filters */}
        <div className="flex mb-4">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mx-2 p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            {/* Add more categories as needed */}
          </select>

          {/* City Filter */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Cities</option>
            <option value="Surat">Surat</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Ahmedabad">Ahmedabad</option>
            {/* Add more cities as needed */}
          </select>
        </div>

        {/* Product Catalog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            // <ProductCard key={product.id} product={product} />
            <button key={product.id}>{product.name}</button>
          ))}
        </div>
      </div>
    </div>
  );
};
