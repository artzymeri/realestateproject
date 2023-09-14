import React, { useEffect, useState } from "react";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Posting from "./Posting";
import './Posting.css'
import HomeDashboard from "./HomeDashboard";
import EditEstates from "./EditEstates";
import DeleteEstates from "./DeleteEstates";
import ManageAgents from "./ManageAgents";
import ProfileSettings from "./ProfileSettings";
import axios from "axios";

const DashboardAdmin = () => {
    

    const navigate = useNavigate();
    
    const toHomePage = () => {
        navigate('/')
    }


    const [requestsData, setRequestsData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/registerrequests').then((response)=>{
            setRequestsData(response.data);
        })
    },[])

    const activateHome = () => {
        setHome(true);
        setPostEstate(false);
        setEditEstate(false);
        setDeleteEstate(false);
        setManageAgents(false);
        setProfileSettings(false);
    }

    const activatePostEstates = () => {
        setHome(false);
        setPostEstate(true);
        setEditEstate(false);
        setDeleteEstate(false);
        setManageAgents(false);
        setProfileSettings(false);
    }

    const activateEditEstates = () => {
        setHome(false);
        setPostEstate(false);
        setEditEstate(true);
        setDeleteEstate(false);
        setManageAgents(false);
        setProfileSettings(false);
    }

    const activateDeleteEstates = () => {
        setHome(false);
        setPostEstate(false);
        setEditEstate(false);
        setDeleteEstate(true);
        setManageAgents(false);
        setProfileSettings(false);
    }

    const activateManageAgents = () => {
        setHome(false);
        setPostEstate(false);
        setEditEstate(false);
        setDeleteEstate(false);
        setManageAgents(true);
        setProfileSettings(false);
    }

    const activateProfileSettings = () => {
        setHome(false);
        setPostEstate(false);
        setEditEstate(false);
        setDeleteEstate(false);
        setManageAgents(false);
        setProfileSettings(true);
    }



    const [home, setHome] = useState(true);
    const [postEstate, setPostEstate] = useState(false);
    const [editEstate, setEditEstate] = useState(false);
    const [deleteEstate, setDeleteEstate] = useState(false);
    const [manageAgents, setManageAgents] = useState(false);
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

    console.log(localStorage)

    return (
        <div className="dashboard-body"> 
            <div className="dashboard-left-side">
                <div className="dashboard-left-side-top"><img src="logo.png" onClick={toHomePage}/></div>
                <button onClick={activateHome}><i class="ri-home-2-line"></i> Home</button>
                <button onClick={activatePostEstates}><i class="ri-add-box-line"></i> Post Estates</button>
                <button onClick={activateEditEstates}><i class="ri-edit-box-line"></i> Edit Estates</button>
                <button onClick={activateDeleteEstates}><i class="ri-delete-bin-2-fill"></i> Delete Estates</button>
                <button onClick={activateManageAgents}><i class="ri-profile-line"></i> Manage Agents {requestsData && requestsData.length > 0 ? <p id="requests-data-number">{requestsData.length}</p> : null}</button>
                <button onClick={activateProfileSettings}><i class="ri-settings-2-line"></i> Profile Settings</button>
                <div className="dashboard-left-side-bottom" onClick={handleLogout}><i class="ri-logout-box-line"></i><p>Logout</p></div>
            </div>
            <div className="dashboard-right-side">
                <div className="dashboard-right-side-navbar">
                    <h1>{usernameofUser}'s Dashboard</h1>
                    <div className="dashboard-right-side-navbar-name">
                    <h1 id="hello">Hello and Welcome, <b>{nameofUser}</b></h1><img onClick={activateProfileSettings} id="hello-image" src={profilePictureofUser} />
                    </div>
                </div>
            {home ? <HomeDashboard /> : null}
            {postEstate ? <Posting /> : null}  
            {editEstate ? <EditEstates /> : null}
            {deleteEstate ? <DeleteEstates /> : null}
            {manageAgents ? <ManageAgents /> : null}   
            {profileSettings ? <ProfileSettings /> : null}
            </div>
            
        </div>
    )
}


export default DashboardAdmin;