import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        
        // Redirect to the login page
        navigate('/registerandlogin');
    };

    return (
        <button className='logout-button' onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
