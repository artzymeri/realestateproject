import React, { useState } from "react";
import './ProfileSettings.css';
import axios from "axios";

const ProfileSettings = () => {

    const nameofUser = localStorage.getItem('name');
    const surnameofUser = localStorage.getItem('surname');
    const numberofUser = localStorage.getItem('number');
    const usernameofUser = localStorage.getItem('usernameofUser');
    const profilePictureofUser = localStorage.getItem('profilepicture');

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    console.log(password1)

    return(
        <div className="profile-settings-body">
            <div className="profile-settings-nav"><h1>{nameofUser} {surnameofUser}'s Profile Settings Tab</h1></div>
            <div className="profile-settings-content">
                <div className="hidden-profile-settings">
                    <div className="password-changer">
                        <h1>Password Change Tab</h1>
                        <p>type your new password twice</p>
                        <input type="password" value={password1} onChange={(e)=>{setPassword1(e.target.value)}}/>
                        <input type="password" value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
                        <button onClick={()=>{
                            try{
                                if(password1 == password2){
                                    if(password1.length < 8){
                                        window.alert('password is less than 8 characters')
                                    }else{
                                        axios.post(`http://localhost:8080/changepassword/${usernameofUser}`, {password: password2});
                                        window.alert('Successful Change of Password');
                                        setPassword1('');
                                        setPassword2('');
                                    }
                                 
                                }else{
                                    window.alert('Passwords do not match!')
                                }
                            }catch(error){
                                console.log(error);
                                window.alert('Error!')
                            }
                        }}>Change Password</button>
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