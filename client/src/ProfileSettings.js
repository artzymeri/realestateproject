import React from "react";
import './ProfileSettings.css'

const ProfileSettings = () => {

    const nameofUser = localStorage.getItem('name');
    const surnameofUser = localStorage.getItem('surname');
    const numberofUser = localStorage.getItem('number');
    const usernameofUser = localStorage.getItem('usernameofUser');
    const profilePictureofUser = localStorage.getItem('profilepicture');

    return(
        <div className="profile-settings-body">
            <div className="profile-settings-nav"><h1>{nameofUser} {surnameofUser}'s Profile Settings Tab</h1></div>
            <div className="profile-settings-content">
                <div className="hidden-profile-settings">
                    <div className="password-changer">
                        <h1>Password Change Tab</h1>
                        <p>type your new password twice</p>
                        <input type="password" />
                        <input type="password" />
                        <button>Change Password</button>
                    </div>
                </div>
                <div className="profile-box profile">
                    <div className="profile-box-photo">
                         <img src={profilePictureofUser} />
                    </div>
                    <div className="profile-box-details">
                         <div>{nameofUser}</div>
                         <div>{surnameofUser}</div>
                         <div>{numberofUser}</div>
                         <div>@ {usernameofUser}</div>
                    </div>
                </div>
                <div className="profile-change-username profile">
                    <i class="ri-lock-password-fill"></i> Change Password
                </div>
                <div className="profile-change-name-surname profile">
                    <i class="ri-edit-line"></i> Change Name, Surname and Number
                </div>
                <div className="profile-change-profilepicture profile">
                    <i class="ri-image-edit-fill"></i> Change your profile picture 
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings;