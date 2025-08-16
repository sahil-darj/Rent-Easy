import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from '../assest/logo.png'
import { useAuth } from '../redux/auth';
import toast from 'react-hot-toast';

export const Navbar = () => {
    const { isloggedIn } = useAuth();
    return (
        <div className='bg-gray-950 py-5'>
            <div className='w-11/12 flex text-white justify-between text-[19px] items-center max-w-[1260px] mx-auto'>
                <Link to="/" className=''>
                    <img src={logo} className="w-36" />
                </Link>
                <nav>
                    <ul className='text-white flex gap-x-6'>
                        <li>
                            <Link to="/"> Home</Link>
                        </li>
                        <li>
                            <Link to="/Products">Products</Link>
                        </li>
                        <li>
                            <Link to="/contactus">Contact Us</Link>
                        </li>
                    </ul>
                </nav>
                <div className='text-white flex gap-x-5'>
                    {isloggedIn ?
                        (
                            <>
                                <Link to="/myorders">
                                    <button className='border py-1 px-4 rounded-md '>My Orders</button>
                                </Link>

                                <Link to="/profile">
                                    <button className='border py-1 px-4 rounded-md '>Dashboard</button>
                                </Link>
                            </>
                        )
                        :
                        (<>
                            <Link to="/login">
                                <button className='border py-1 px-4 rounded-md '>Sign In</button>
                            </Link>

                            <Link to="/signup">
                                <button className='border py-1 px-4 rounded-md bg-white text-black '>Sign Up</button>
                            </Link>
                        </>)}


                </div>

            </div>

        </div>
    )
}
