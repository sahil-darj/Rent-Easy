import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from "../redux/UserContext";
import { useAuth } from '../redux/auth';

const Extra = () => {

  const { state, setName, setEmail, setPassword } = useUser();
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isBirthdateValid, setIsBirthdateValid] = useState(true);
  const [ExtraDetails, setExtraDetails] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    birthdate: "",
    state: "",
    userType: "",
  });

  const {storetokenInLS}  = useAuth();

  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setExtraDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleGenderChange = (e) => {
    handleChange(e);
  };
  const handleCheckboxChange = () => {
    setAgreedToTerms(!agreedToTerms);
  };
  const handleBirthdateChange = (e) => {
    const { value } = e.target;
    setExtraDetails((prev) => ({
      ...prev,
      birthdate: value,
    }));
    setBirthdate(e.target.value);
    const birthdateInput = new Date(e.target.value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthdateInput.getFullYear();
    setIsBirthdateValid(age >= 18);
  };

  useEffect(() => {
    setExtraDetails((prevDetails) => ({
      ...prevDetails,

      name: state.name,
      email: state.email,
      password: state.password,

    }));
  }, [state.name, state.email, state.password]);

  console.log(ExtraDetails);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(ExtraDetails),
      });
      
      const res_data = await response.json();
      console.log(res_data);

      if (response.ok) {
        storetokenInLS(res_data.token);
        console.log("res_data "+res_data);

        if (res_data.userType == "renter") {
          window.location.href = "http://localhost:3000/"; 
          } else if(res_data.userType == "owner") {
            window.location.href = "http://localhost:3001/admin/profile";
          }
      }
      else {
        alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }


  }

  return (
    <div className="bg-gray-400 h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-lg shadow-md w-6/12 h-4/5">

        <div className='bg-black py-64 rounded-lg text-center w-3/6'>
          <Link to="/signup" className="border rounded-lg text-white py-2 px-5 m-2 hover:bg-gray-800">&#x2190; Back</Link>
        </div>
        <div className='w-3/6 px-2 align-center justify-center'>
          <h2 className="text-4xl mt-8 text-center font-bold mb-5">Create Account</h2>
          <form className='px-10 pt-5' onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="gender" className="block mb-2 text-gray-700 font-semibold">
                Gender
              </label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleGenderChange}
                    checked={ExtraDetails.gender === 'male'}
                    className="mr-2"
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleGenderChange}
                    checked={ExtraDetails.gender === 'female'}
                    className="mr-2"
                    required
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="birthdate" className="block text-gray-700 font-semibold">
                Birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className={`w-full border rounded-md py-2 px-3 mt-1 `}
                placeholder="Your birthdate"
                value={birthdate}
                onChange={handleBirthdateChange}
                required
              />
              {!isBirthdateValid &&
                <p className="text-red-500 text-sm mt-1">
                  * You must be at least 18 years old.
                </p>
              }
            </div>

            <div className="mb-4">
              <label htmlFor="state" className="block text-gray-700 font-semibold">
                State
              </label>
              <select
                id="state"
                name="state"
                className="w-full border rounded-md py-2 px-3 mt-1"
                value={ExtraDetails.state}
                onChange={handleChange}
                required
              >
                <option >Select your state</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="userType" className="block text-gray-700 font-semibold">
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                className="w-full border rounded-md py-2 px-3 mt-1"
                value={ExtraDetails.userType}
                onChange={handleChange}
                required
              >
                <option >Select user type</option>
                <option value="owner">Owner</option>
                <option value="renter">Renter</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={agreedToTerms}
                  className="mr-2"
                />
                I agree to the Terms and Conditions
              </label>
            </div>

            <button
              type="submit"
              className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 ${
                !agreedToTerms || !isBirthdateValid
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!agreedToTerms || !isBirthdateValid}
            >
              Sign Up
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Extra;
