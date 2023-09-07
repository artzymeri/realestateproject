import React from "react";
import './DashboardAgent.css';
import { useNavigate } from 'react-router-dom';

const DashboardAgent = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('usernameofUser');
        localStorage.removeItem('profilepicture');
        
        // Redirect to the login page
        navigate('/registerandlogin');
    };
    const profilePictureofUser = localStorage.getItem('profilepicture');
    const usernameofUser = localStorage.getItem('usernameofUser');

    return (
        <div className="dashboard-body"> 
            <div className="dashboard-left-side">
                <div className="dashboard-left-side-top"><img src="logo.png" /></div>
                <button><i class="ri-home-2-line"></i> Home</button>
                <button><i class="ri-add-box-line"></i> Post Estates</button>
                <button><i class="ri-edit-box-line"></i> Edit Estates</button>
                <button><i class="ri-delete-bin-2-fill"></i> Delete Estates</button>
                <button><i class="ri-settings-2-line"></i> Profile Settings</button>
                <div className="dashboard-left-side-bottom" onClick={handleLogout}><i class="ri-logout-box-line"></i><p>Logout</p></div>
            </div>
            <div className="dashboard-right-side">
                <div className="dashboard-right-side-navbar">
                    <h1>{usernameofUser}'s Dashboard</h1>
                    <div className="dashboard-right-side-navbar-name">
                    <h1 id="hello">Hello and Welcome, <b>{usernameofUser}</b></h1><img id="hello-image" src={profilePictureofUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DashboardAgent;