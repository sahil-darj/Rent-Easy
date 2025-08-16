import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function ForgotPassword() {

    const [email, setEmail] = useState();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    console.log(email);

    const handleSubmit = async (e, req, res) => {
        e.preventDefault();
        setMessage('Password reset instructions sent to your email.');
        try {
            const response = await fetch("http://localhost:3000/api/forgot/forgotPassword", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email }),
            });

            console.log(response);
            const res_data = await response.json();
            console.log(res_data);

            if (response.ok) {
                console.log("requsert is sent to backend");
                // navigate("/login")
                toast.success("Request is sent to mail ");
            }

        } catch (error) {
            console.error("Network error:", error);
        }
    };


    return (
        <div className="bg-gray-400 h-screen flex items-center justify-center">
            <div className="bg-white px-10 rounded-lg shadow-md w-1/4 h-4/6 p-6">
                <h2 className="text-4xl mt-16 text-center font-bold mb-16">Forgot your password?</h2>
                {message && <p className="mt-2 text-center text-sm text-gray-600">{message}</p>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="mb-10">
                        <label htmlFor="email" className="block text-gray-700 font-semibold">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-md py-2 px-3 mt-4"
                            placeholder="Your email"
                        />
                    </div>


                    <div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                            >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
