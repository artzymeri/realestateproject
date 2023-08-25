import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');

    if (token) {
        return element;
    } else {
        return <Navigate to="/registerandlogin" />;
    }
};

export default ProtectedRoute;
