import React from "react";
import './ProfileSettings.css'

const ProfileSettings = () => {

    const nameofUser = localStorage.getItem('name');
    const surnameofUser = localStorage.getItem('surname');
    const numberofUser = localStorage.getItem('number');
    const usernameofUser = localStorage.getItem('username');
    const profilePictureofUser = localStorage.getItem('profilepicture');


    return(
        <div className="profile-settings-body">
            <div className="profile-settings-nav"><h1>{nameofUser} {surnameofUser}'s Profile Settings Tab</h1></div>
            <div className="profile-settings-content">
                <div className="profile-settings-content-left">
                    <div className="profile-settings-element">
                        <h1>Change Profile Picture</h1>
                    </div>
                    <div className="profile-settings-element">
                        <h1>Change Name and Surname</h1>
                    </div>
                    <div className="profile-settings-element">
                        <h1>Change Number</h1>
                    </div>
                    <div className="profile-settings-element">
                        <h1>Change password</h1>
                    </div>
                </div>
                <div className="profile-settings-content-right">
                    <div className="profile-settings-element">
                        <h1>Name : {nameofUser}</h1>
                    </div>
                    <div className="profile-settings-element">
                        <h1>Surname : {surnameofUser}</h1>
                    </div>
                    <div className="profile-settings-element">
                        <h1>Number : {numberofUser}</h1>
                    </div>
                    <div className="profile-settings-profile-picture"><img src={profilePictureofUser} /></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings;