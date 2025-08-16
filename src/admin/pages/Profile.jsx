import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../../redux/auth';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router';

const Profile = () => {
    const initialUserData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNo: '',
        birthdate: 'January 1, 1990',
        state: 'California',
        city: '',
        address: '',
        Occupation: 'Developer',
    };

    const [userdata, setUserdata] = useState({
        name: "",
        email: '',
        birthdate: '',
        state: '',
        phoneNo: '',
        city: '',
        address: '',
        Occupation: '',
    })

    const [userData, setUserData] = useState(true);
    const { user, authorizationToken } = useAuth();
    // console.log(authorizationToken);
    console.log(user);
    useEffect(() => {
        if (user && userData) {
            setUserdata({
                name: user.userData.name,
                email: user.userData.email,
                birthdate: user.userData.birthdate,
                state: user.userData.state,
                phoneNo: user.userData.phoneNo,
                city: user.userData.city,
                address: user.userData.address,
                Occupation: user.userData.Occupation
            });
            setUserData(true);
        }
    }, [user, setUserData]);
    // console.log(userdata);


    // console.log(id);

    // const [userData, setUserData] = useState(initialUserData);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState(userData);
    // console.log(userdata);
    const handleUpdateClick = () => {
        setIsUpdateMode(true);
        // setUpdatedUserData(userData);
    };

    const handleCancelUpdate = () => {
        setIsUpdateMode(false);
    };

    // console.log(userdata);
    console.log(userdata);

    const handleSubmit = async (e, req, res) => {
        e.preventDefault();
        try {
            // console.log(user.userData._id);
            // console.log('Request Payload:', JSON.stringify(userData));
            const response = await fetch(`http://localhost:3000/api/auth/user/update/${user.userData._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization : authorizationToken,
                },
                body: JSON.stringify(userdata),
            });
            console.log(response);
            const res_data = await response.json();
            console.log(res_data);

            if (response.ok) {
                toast.success("Updated Successfully");
                // console.log("updated successfully done");
                setIsUpdateMode(false);
                // Handle success
            } else {
                toast.error("Error in updating data")
                // Handle error
                // const errorData = await response.json();
                console.error('Error:');
            }

        } catch (error) {
            toast.error("Error in updating data")
            console.error(error);
        }
    };

    const handleSaveUpdate = () => {
        setUserData(updatedUserData);
        setIsUpdateMode(false);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow max-w-4xl mx-auto my-6 p-4 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl text-center font-semibold mb-6">Profile</h2>
                <div className="bg-gray-100 p-4 rounded-md mb-6">
                    {isUpdateMode ? (
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-6">
                                <label htmlFor="name">Name: </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={userdata.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email">Email: </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={userdata.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="birthdate">Birthdate: </label>
                                <input
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    value={userdata.birthdate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="state">State: </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={userdata.state}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="phoneNo">phoneNo No: </label>
                                <input
                                    type="text"
                                    id="phoneNo"
                                    name="phoneNo"
                                    value={userdata.phoneNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="city">City: </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={userdata.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="address">Address: </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={userdata.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-12">
                                <label htmlFor="Occupation">Occupation: </label>
                                <input
                                    type="text"
                                    id="Occupation"
                                    name="Occupation"
                                    value={userdata.Occupation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                                // onClick={handleSaveUpdate}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                                    onClick={handleCancelUpdate}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="mb-6">
                                <strong>Name:</strong> {userdata.name}
                            </div>
                            <div className="mb-6">
                                <strong>Email:</strong> {userdata.email}
                            </div>
                            <div className="mb-6">
                                <strong>Birthdate:</strong> {userdata.birthdate}
                            </div>
                            <div className="mb-6">
                                <strong>State:</strong> {userdata.state}
                            </div>
                            <div className="mb-6">
                                <strong>Phone No:</strong> {userdata.phoneNo}
                            </div>
                            <div className="mb-6">
                                <strong>City:</strong> {userdata.city}
                            </div>
                            <div className="mb-6">
                                <strong>Address:</strong> {userdata.address}
                            </div>
                            <div className="mb-12">
                                <strong>Occupation:</strong> {userdata.Occupation}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="bg-black text-white py-2 px-4 rounded-md mr-2"
                                    onClick={handleUpdateClick}
                                >
                                    Update
                                </button>
                            </div>                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
