import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import banner from '../assest/banner.png';
import carimg from '../assest/carimg3.webp'
import bike from '../assest/bike.jpg';
import { Navbar } from '../components/Navbar';
import logo from '../assest/logo.png'
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';


export const Home = () => {
  return (
    <div className='w-full '>
      <Navbar />
      <HeroSection/>
      <div>
      {/* <img src={banner} className='relative h-screen w-screen' alt="im" />
      <div className='max-w-[1260px] mx-auto'>
        <p className='absolute top-[180px] text-5xl text-white'>Unlock Endless Driving <br /> with RentEasy</p>
        <p className='absolute top-[325px] text-xl text-white opacity-60'>Explore the open road with our premium car rental services. <br />
          Choose from a fleet of modern vehicles to elevate your travel experience</p>
        <button className='absolute top-[410px] text-2xl border rounded-lg p-1 px-2 bg-white'>Rent Car</button>
      </div> */}

        
      </div>
      {/* rent a car section */}

      <div className='w-11/12 flex flex-row items-center max-w-[1260px] mx-auto mt-24'>
        <div className='flex flex-col pr-5 ml-10'>
          <p className='font-semibold font-serif text-5xl '>Rent A Car</p>
          <div className='mt-8 flex space-x-5'>
            <button className='max-w-fit p-1 px-5 rounded-md opacity-90 bg-neutral-200 hover:opacity-100'>Family</button>
            <button className='max-w-fit p-1 px-5 rounded-md opacity-90 bg-neutral-200 hover:opacity-100'>Electrical</button>
            <button className='max-w-fit p-1 px-5 rounded-md opacity-90 bg-neutral-200 hover:opacity-100'>Convertibles</button>
            <button className='max-w-fit p-1 px-5 rounded-md opacity-90 bg-neutral-200 hover:opacity-100'>Economy</button>
          </div>
          <p className='mt-8 text-base font-serif opacity-70 space-x-28 mr-28'>Experience seamless travel with our premium rental car services.
            Whether you're navigating the city streets or embarking on a scenic road trip, our diverse fleet of well-maintained
            vehicles ensures a comfortable and reliable journey. Enjoy the convenience of hassle-free booking, flexible rental
            options, and competitive rates. Choose us for your next adventure and let us elevate your travel experience with quality
            vehicles and exceptional service.</p>

          {/* <button className='max-w-36 mt-7 text-xl rounded-lg hover:shadow-md hover:shadow-black transition duration-300 p-1 px-2 text-white bg-black'>Rent Car</button> */}

        </div>
        <img src={carimg} className=' relative max-w-[500px] h-[600px]  rounded-lg' alt="" />

      </div>

      {/* rent a bike section */}

      <div className='w-11/12 flex flex-row items-center max-w-[1260px] mx-auto mt-32 mb-28'>

        <img src={bike} className='max-w-[500px] h-[500px]  rounded-lg' alt="" />

        <div className='flex flex-col pr-5 ml-32'>
          <p className='font-semibold font-serif text-5xl '>Rent A Bike</p>
          <div className='mt-8 flex space-x-5'>
            <button className='max-w-fit p-1 px-5 rounded-md opacity-90 bg-neutral-200 hover:opacity-100'>Adventure</button>
            <button className='max-w-fit p-1 px-5 rounded-md opacity-90 bg-neutral-200 hover:opacity-100'>Ride</button>
            <button className='max-w-fit p-1 px-5 rounded-md opacity-90 bg-neutral-200 hover:opacity-100'>Breeze</button>
            <button className='max-w-fit p-1 px-5 rounded-md opacity-90 bg-neutral-200 hover:opacity-100'>Plush</button>
          </div>
          <p className='mt-8 text-base font-serif opacity-70 space-x-28 mr-28'>Explore the city at your own pace with our convenient bike
            rental service. Whether you're a local wanting a leisurely ride or a tourist eager to discover hidden gems, our fleet of
            well-maintained bikes is ready for your adventure. Enjoy the freedom of two wheels and soak in the sights effortlessly.
            Rent a bike today and pedal your way to a memorable experience.</p>

          {/* <button className='max-w-36 mt-7 text-xl rounded-lg hover:shadow-md hover:shadow-black 
          transition duration-300 p-1 px-2 text-white bg-black'>Rent Bike</button> */}

        </div>

      </div>

      {/* footer */}

      <Footer />

    </div>
  )
}
