import { Navigate, Route, Routes } from 'react-router';
import { Products } from './pages/Products';
import { Home } from './pages/Home';
import Contactus from './pages/Contactus';
import Login from './pages/Login';
import Register from './pages/Register';
import Extra from './pages/Extra';
import { UserProvider } from "./redux/UserContext";
import { Logout } from './components/Logout';
import AdminApp from './admin/AdminApp';
import Profile from './pages/Profile';
import { ProductDetails } from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PaymentSuccessfull from './components/PaymentSuccessfull';
import Orders from './pages/Orders';
import './App.css';

function App() {
  return (
    <div>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productdetail/:id" element={<ProductDetails />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
          <Route path="/myorders" element={<Orders />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/extra' element={<Extra />} />
          <Route path='/logout' element={<Logout />}/>
          <Route path='/paymentsuccess' element={<PaymentSuccessfull />}/>
          <Route path='/admin/*' element={<AdminApp />} />

        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
