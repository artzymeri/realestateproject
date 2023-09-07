import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProtectedRoute.css'

const ProtectedRouteAdmin = ({ element }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    const loginPageNav = () => {
        return (
        navigate('/registerandlogin')
        )
    }

    if (token && userRole == 'admin') {
        return element;
    } else {
        return (
        <div className='protected-route-body'>
                <div className='not-authorized'>
                    <div className="logo-div-posting"><img id="login-register-logo" src="logo.png" /><h1>ALERT</h1></div>
                    You are not authorized to access this page!
                    <button onClick={loginPageNav}>Login to access!</button>
                </div>
        </div>
        )
    }
};

export default ProtectedRouteAdmin;
