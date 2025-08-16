import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../redux/auth';
import toast from 'react-hot-toast';

export default function PaymentSuccessfull() {

    const { user } = useAuth();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    console.log("User:", user);
    useEffect(() => {
        setUserData(user.userData);
    }, [user]);
    console.log(userData);

    const clickHandler = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/checkout/PaymentSuccessfullEmail", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userData ),
            });

            console.log(response);
            const res_data = await response.json();
            console.log(res_data);

            if (response.ok) {
                console.log("requsert is sent to backend");
                toast.success("Mail has been sent ");
            }else{
                toast.error("Any error is occur");
            }
            
        } catch (error) {
            console.error("Network error:", error);
        }
        navigate("/")
    }


    return (
        <div>
            <div class="bg-gray-100 pt-16 h-screen">
                <div class="bg-white p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div class="text-center">
                        <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                        <p class="text-gray-600 my-2">Thank you for Rent a Car From us.</p>
                        <p> Have a great day!  </p>
                        <div class="py-10 text-center">
                            <button onClick={clickHandler} class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </button>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}
