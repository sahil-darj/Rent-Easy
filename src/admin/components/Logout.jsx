import React, { useEffect } from 'react'
import { Navigate } from 'react-router';
import { useAuth } from '../../redux/auth';
import { toast } from 'react-hot-toast';

export const Logout = () => {
    const {LogoutUser} =  useAuth();
    // toast.success("Logout Sucessfully ");

    useEffect(()=>{
        LogoutUser();
    },[LogoutUser]);

  return (
    <Navigate to='/login'></Navigate>
  )
}
