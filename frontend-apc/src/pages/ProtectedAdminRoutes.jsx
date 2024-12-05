import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoutes = () => {

    const isAdmin = sessionStorage.getItem('isAdmin');

    if (isAdmin === 'false'){
        return <Navigate to="/home" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default ProtectedAdminRoutes



