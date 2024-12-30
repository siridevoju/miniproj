import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const authToken = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user')) || {};

    useEffect(() => {
        if (!authToken) {
            toast.warn('Please log in to access this page.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (adminOnly && user.role !== 'admin') {
            toast.warn('Access denied. Admins only.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [authToken, adminOnly, user.role]);

    if (!authToken) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/home" />; // Redirect to home or any other page
    }

    return children;
};

export default PrivateRoute;
