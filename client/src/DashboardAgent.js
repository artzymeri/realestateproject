import React, { useState } from "react";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Posting from "./Posting";
import EditEstates from "./EditEstates";
import HomeDashboard from "./HomeDashboard";
import DeleteEstates from "./DeleteEstates";
import ProfileSettings from "./ProfileSettings";

const DashboardAgent = () => {
    const navigate = useNavigate();


    const toHomePage = () => {
        navigate('/')
    }

    const activateHome = () => {
        setHome(true);
        setPostEstate(false);
        setEditEstate(false);
        setDeleteEstate(false);
        setProfileSettings(false);
    }

    const activatePostEstates = () => {
        setHome(false);
        setPostEstate(true);
        setEditEstate(false);
        setDeleteEstate(false);
        setProfileSettings(false);
    }

    const activateEditEstates = () => {
        setHome(false);
        setPostEstate(false);
        setEditEstate(true);
        setDeleteEstate(false);
        setProfileSettings(false);
    }

    const activateDeleteEstates = () => {
        setHome(false);
        setPostEstate(false);
        setEditEstate(false);
        setDeleteEstate(true);
        setProfileSettings(false);
    }


    const activateProfileSettings = () => {
        setHome(false);
        setPostEstate(false);
        setEditEstate(false);
        setDeleteEstate(false);
        setProfileSettings(true);
    }

    const [home, setHome] = useState(true);
    const [postEstate, setPostEstate] = useState(false);
    const [editEstate, setEditEstate] = useState(false);
    const [deleteEstate, setDeleteEstate] = useState(false);
    const [profileSettings, setProfileSettings] = useState(false);


    const handleLogout = () => {
       
        localStorage.removeItem('token');
        localStorage.removeItem('usernameofUser');
        localStorage.removeItem('profilepicture');
        localStorage.removeItem('name');
        localStorage.removeItem('surname');
        localStorage.removeItem('number');
        localStorage.removeItem('userRole');
        
        navigate('/registerandlogin');
    };
    const profilePictureofUser = localStorage.getItem('profilepicture');
    const usernameofUser = localStorage.getItem('usernameofUser');
    const nameofUser = localStorage.getItem('name');
    const surnameofUser = localStorage.getItem('surname');
    const numberofUser = localStorage.getItem('number');

    return (
        <div className="dashboard-body"> 
            <div className="dashboard-left-side">
                <div className="dashboard-left-side-top"><img src="logo.png" onClick={toHomePage} /></div>
                <button onClick={activateHome}><i class="ri-home-2-line"></i> Home</button>
                <button onClick={activatePostEstates}><i class="ri-add-box-line"></i> Post Estates</button>
                <button onClick={activateEditEstates}><i class="ri-edit-box-line"></i> Edit Estates</button>
                <button onClick={activateDeleteEstates}><i class="ri-delete-bin-2-fill"></i> Delete Estates</button>
                <button onClick={activateProfileSettings}><i class="ri-settings-2-line"></i> Profile Settings</button>
                <div className="dashboard-left-side-bottom" onClick={handleLogout}><i class="ri-logout-box-line"></i><p>Logout</p></div>
            </div>
            <div className="dashboard-right-side">
                <div className="dashboard-right-side-navbar">
                    <h1>{nameofUser} {surnameofUser}'s Dashboard</h1>
                    <div className="dashboard-right-side-navbar-name">
                    <h1 id="hello">Hello and Welcome, <b>{nameofUser}</b></h1><img onClick={activateProfileSettings} id="hello-image" src={profilePictureofUser} />
                    </div>
                </div>
                {home ? <HomeDashboard /> : null}
                {postEstate ? <Posting /> : null}
                {editEstate ? <EditEstates /> : null}
                {deleteEstate ? <DeleteEstates /> : null}
                {profileSettings ? <ProfileSettings /> : null}
            </div>
        </div>
    )
}


export default DashboardAgent;