import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import UserController from '../controller/UserController';
import Navbar from '../components/Navbar';

const ProtectedRoutes = () => {


    if (!UserController.isLoggedIn()){
        return <Navigate to="/sign-in" />;
      }

  return (
    <div>
      <Navbar window={() => window}/>
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes
