import { Outlet, Route, Routes } from "react-router";
// import Home from "./pages/Home";
import AddVehicle from "./pages/add-vehicle";
import YourVehical from "./pages/YourVehical"
import Profile from "./pages/Profile";
import { Logout } from "./components/Logout";
import ViewVehicle from "./pages/ViewVehicle";
import UpdateVehicle from "./pages/updateVehicle";


function App() {
  return (
    <div>
      <Outlet />
        <Routes>
          <Route authorisedUsers={['Admin']} path="profile" element={<Profile />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
          <Route path="your-vehicle" element={<YourVehical />} />
          <Route path="vehicleDetail/:id" element={<ViewVehicle />} />
          <Route path="updateVehical/:id" element={<UpdateVehicle />} />
          <Route path="logout" element={<Logout/>} />
        </Routes>
    </div>
  );
}

export default App;
