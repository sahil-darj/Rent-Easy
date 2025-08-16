import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assest/logo.png";
import ProfileIcon from "../assest/profile.png";
import AddVehicleIcon from "../assest/add.png";
import YourVehicleIcon from "../assest/vehicle.png";
import LogoutIcon from "../assest/logout.png";
import toast from "react-hot-toast";

const iconStyle = {
  filter: "invert(1)",
};

const Sidebar = () => {
  return (
    <div className="bg-gray-800 min-h-screen w-52 text-white p-4 flex flex-col">
      <div className="mb-4 border-b-2 border-white pb-2">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-36 mb-10" />
        </Link>
        <Link to="/admin/profile" className="p-2 flex items-center">
          <img
            src={ProfileIcon}
            alt="profile"
            className="w-4 h-4 mr-4"
            style={iconStyle}
          />
          Profile
        </Link>
      </div>
      <div className="mb-4 border-b-2 border-white pb-2">
        <Link to="/admin/add-vehicle" className="p-2 flex items-center">
          <img
            src={AddVehicleIcon}
            alt="add-vehicle"
            className="w-5 h-5 mr-4"
            style={iconStyle}
          />
          Add Vehicle
        </Link>
      </div>
      <div className="mb-4 border-b-2 border-white pb-2">
        <Link to="/admin/your-vehicle" className="p-2 flex items-center">
          <img
            src={YourVehicleIcon}
            alt="your-vehicle"
            className="w-5 h-5 mr-4"
            style={iconStyle}
          />
          Your Vehicle
        </Link>
      </div>
      {/* <div className="flex-grow"></div> */}
      <div>
        <Link to="/logout" className="p-2 flex items-center" onClick={()=>{toast.success("Logot Successfully")}}>
          <img
            src={LogoutIcon}
            alt="logout"
            className="w-5 h-5 mr-4"
            style={iconStyle}
          />
          Logout
        </Link>
      </div>
      <div className="flex-grow"></div>
      <div>
        <p className="p-2 flex mx-auto hover:cursor-pointer">
          @copyrights RentEasy.com
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
