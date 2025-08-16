import React, { useEffect } from 'react'
import { Navigate } from 'react-router';
import { useAuth } from '../redux/auth';

export const Logout = () => {
    const {LogoutUser} =  useAuth();

    useEffect(()=>{
        LogoutUser();
    },[LogoutUser]);

  return (
    <Navigate to='/login'></Navigate>
  )
}
