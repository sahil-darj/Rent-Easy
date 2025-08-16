import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { toast } from 'react-hot-toast';
export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ShowPassword, setShowPassword] = useState(false);
    const [ShowCnfPassword, setShowCnfPassword] = useState(false);

    const { id, token } = useParams()
    const navigate = useNavigate();

    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        return regex.test(password);
      };

    const handleSubmit = async (e, req, res) => {
        e.preventDefault();
        if (!isPasswordValid(password)) {
            alert('Password must contain a mixture of alphabets, numbers, and special characters');
            return;
          }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return; // Exit early if passwords don't match
        }
        try {
            console.log(id);
            console.log(token);
            const response = await fetch(`http://localhost:3000/api/forgot/resetPassword/${id}/${token}`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ password }),
            });
            const res_data = await response.json();
            console.log(res_data);

            if (response.ok) {
                navigate("/login")
                toast.success("Password reset successfully ");
            } else {
                const res_data = await response.json();
                console.log(res_data);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div className="bg-gray-400 h-screen flex items-center justify-center">
            <div className="bg-white px-10 rounded-lg shadow-md w-1/4 h-4/6 p-6">
                <div >
                    <h2 className="text-4xl mt-4 text-center font-bold mb-16">Reset Your Password</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">
                            New Password
                        </label>
                        <input
                            type={ShowPassword ? ("text") : ("password")}
                            id="password"
                            name="password"
                            required
                            className="w-full border rounded-md py-2 px-3 mt-4"
                            placeholder="Enter new Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="absolute right-3 top-[50px] cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {ShowPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#afb2bf" />
                            )}
                        </span>
                    </div>
                    <div className="mb-10 relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">
                            Confirm New Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={ ShowCnfPassword ? ("text") : ("password")}
                            required
                            className="w-full border rounded-md py-2 px-3 mt-4"
                            placeholder="Enter confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span
                          className="absolute right-3 top-[50px] cursor-pointer"
                          onClick={() => setShowCnfPassword((prev) => !prev)}
                        >
                          {ShowCnfPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
                          ) : (
                            <AiOutlineEye fontSize={24} fill="#afb2bf" />
                          )}
                        </span>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
