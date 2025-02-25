// AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../../lib/userStore'; // assuming you store user info in a store

const AdminRoute = ({ children }) => {
    const { currentUser } = useUserStore();

    if (!currentUser || currentUser.email !== 'nirbhay12@gmail.com') {
        // If not logged in or not the admin, redirect to home or login
        return <Navigate to="/login" />;
    }

    // If the user is the admin, allow access to the admin page
    return children;
};

export default AdminRoute;
