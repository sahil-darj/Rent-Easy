import React, { useState } from 'react'
import { Navbar } from '../components/Navbar';
import makeindia from '../assest/makeindia.png';
import { FaAngleRight } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import logo from '../assest/logo.png'
import Footer from '../components/Footer';
// import { ToastContainer } from 'react-toastify';


export default function Contactus() {
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  function changeHandler(event) {
    setContactData((prev) => (
      {
        ...prev, [event.target.name]: event.target.value
      }
    ))
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/form/contact", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(contactData),
      });
      
      const res_data = await response.json();
      console.log(res_data);

      if (response.ok) {
        console.log("data submited");
        // alert('thank you ');
        toast.success("Thank you ❤️ "+ contactData.firstName.charAt(0).toUpperCase() + contactData.firstName.slice(1) + " " +
        contactData.lastName.charAt(0).toUpperCase() + contactData.lastName.slice(1) + " ");

      } else {
        
      }
    } catch (error) {
      console.log("error in contact form "+error);
    }


    
    setContactData({
      firstName: "",
      lastName: "",
      email: "",
      message: ""
    });
  }

  return (
    <div>
      <Navbar />
      <section className="w-[1080px] mx-auto font-inter ">
        <div className="container px-6 py-12 mx-auto">
          <div className='flex flex-col justify-center items-center'>
            <p className="font-medium text-3xl text-black dark:text-blue-400">Contact us</p>


            <p className="mt-3 text-gray-500 dark:text-gray-400">We’d love to hear from you. Please fill out this form or shoot us an email.</p>
          </div>

          <div className=" grid-rows-1 gap-12 mt-10 lg:grid-cols-2">
            <div className="grid lg:grid-cols-3 gap-12 mb-14 md:grid-cols-2">
              <div className='flex flex-col justify-center items-center'>
                <span className="inline-block p-3 text-white rounded-full bg-[#161a23] dark:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-[#2D5A6A] dark:text-white">Email</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
                <a href='mailto:renteasy312@gmail.com' className="mt-2 text-sm text-richblack-5 dark:text-blue-400">renteasy312@gmail.com</a>
              </div>

              <div className='flex flex-col justify-center items-center'>
                <span className="inline-block p-3 text-white rounded-full bg-[#161a23] dark:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-[#2D5A6A] dark:text-white">Office</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Come say hello at our office HQ.</p>
                <a href="http://maps.google.com/maps?q=210+Louise+Ave,+Nashville,+TN+37203" 
                className="mt-2 text-sm text-richblack-5 dark:text-blue-400">6VFH+92X, Varachha Main Rd, 
                Kapodra Patiya, Surat, Gujarat 395006</a>
              </div>

              <div className='flex flex-col justify-center items-center'>
                <span className="inline-block p-3 text-white rounded-full bg-[#161a23] dark:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-[#2D5A6A] dark:text-white">Phone</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:7096305498" className="mt-2 text-sm text-richblack-5 dark:text-blue-400">+91 70963 05498</a>
              </div>
            </div>

            <div className="p-4 w-9/12 mx-auto py-6 rounded-lg  md:p-8">
              <form onSubmit={submitHandler}>
                <div className="-mx-2 md:items-center md:flex">
                  <div className="flex-1 px-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                    <input required
                      type="text"
                      name='firstName'
                      value={contactData.firstName}
                      onChange={changeHandler}
                      placeholder="First Name "
                      className="block px-5 py-2.5 mt-2  placeholder-gray-400 
                                           border border-gray-200  dark:placeholder-gray-600 
                                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 
                                          dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none 
                                          focus:ring focus:ring-opacity-40 bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]" />
                  </div>

                  <div className="flex-1 px-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
                    <input required
                      type="text"
                      name='lastName'
                      value={contactData.lastName}
                      onChange={changeHandler}
                      placeholder="Last Name"
                      className="block px-5 py-2.5 mt-2  placeholder-gray-400 
                                           border border-gray-200  dark:placeholder-gray-600 
                                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 
                                          dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none 
                                          focus:ring focus:ring-opacity-40 bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                  <input required
                    type="email"
                    name='email'
                    value={contactData.email}
                    onChange={changeHandler}
                    placeholder="Email"
                    className="block px-5 py-2.5 mt-2  placeholder-gray-400 
                                           border border-gray-200  dark:placeholder-gray-600 
                                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 
                                          dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none 
                                          focus:ring focus:ring-opacity-40 bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]" />
                </div>

                <div className="w-full mt-4">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
                  <textarea required
                    name='message'
                    value={contactData.message}
                    onChange={changeHandler}
                    className="block px-5 py-2.5 mt-2  placeholder-gray-400 
                                           border border-gray-200  dark:placeholder-gray-600 
                                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 
                                          dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none 
                                          focus:ring focus:ring-opacity-40 bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]" rows={10} placeholder="Message"></textarea>
                </div>

                <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}

      <Footer/>


    </div>
  )
}
