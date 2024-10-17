import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import UserController from '../controller/UserController';

const ProtectedRoutes = () => {


    if (!UserController.isLoggedIn()){
        return <Navigate to="/sign-in" />;
      }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes
