import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useUser } from "../redux/UserContext";

const Register = () => {
  const { state, setName, setEmail, setPassword } = useUser();
  const [ShowPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    setName:"",
    setEmail:"",
    setPassword:""
  });
  console.log(state);

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    return regex.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!isPasswordValid(state.password)) {
      alert('Password must contain a mixture of alphabets, numbers, and special characters');
      return;
    }
    navigate('/extra');
  };

  return (
    <div className="bg-gray-400 h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-lg shadow-md w-6/12 h-4/6">

        <div className='bg-black pt-32 rounded-lg text-center align-center w-3/6'>
          <p className='text-white text-5xl text-center mb-7'>Welcome, back!</p>
          <p className='text-white text-lg text-center'>To keep connected with us please</p>
          <p className='text-white text-lg text-center mb-10'>login with your personal info</p>

          <Link to="/login" className="border rounded-lg text-white py-2 px-5 m-2 hover:bg-gray-800">Sign In</Link>
        </div>

        <div className='w-3/6 px-2 align-center justify-center'>
          <h2 className="text-4xl mt-8 text-center font-bold ">Create Account</h2>
          <form onSubmit={handleSignup} className='p-10'>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold">
                Name
              </label>
              <input
                type="text"
                id='setName'
                name="setName"
                className="w-full border rounded-md py-2 px-3 mt-1"
                placeholder="Your name"
                value={state.name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name='email'
                className="w-full border rounded-md py-2 px-3 mt-1"
                placeholder="Your email"
                value={state.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-8 relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold">
                Password
              </label>
              <input
                type={ShowPassword ? ("text") : ("password")}
                id="password"
                name="password"
                className="w-full border rounded-md py-2 px-3 mt-1"
                placeholder="Your password"
                value={state.password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                {
                  ShowPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#afb2bf' />) : (<AiOutlineEye fontSize={24} fill='#afb2bf' />)
                }
              </span>
            </div>
            {/* <Link to ="/extra" className="border rounded-lg bg-black text-white py-2 mt-10 block w-full text-center hover:bg-gray-800">Next</Link> */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Next
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Register;
