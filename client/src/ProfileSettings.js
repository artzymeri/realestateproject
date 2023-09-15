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
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [number, setNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState(profilePictureofUser);
    const [activePassword, setActivePassword] = useState(false);
    const [activeName, setActiveName] = useState(false);
    const [activeProfilePicture, setActiveProfilePicture] = useState(false);

    return(
        <div className="profile-settings-body">
            <div className="profile-settings-nav"><h1>{nameofUser} {surnameofUser}'s Profile Settings Tab</h1></div>
            <div className="profile-settings-content">
                {activePassword ? <div className="hidden-profile-settings">
                    <div className="password-changer">
                        <h1 id="x">X</h1>
                        <h1>Password Change Tab</h1>
                        <p>type your new password twice</p>
                        <input placeholder="new password" type="password" value={password1} onChange={(e)=>{setPassword1(e.target.value)}}/>
                        <input placeholder="confirm password" type="password" value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
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
                </div> : null}
                {activeName ? <div className="hidden-profile-settings">
                    <div className="password-changer">
                        <h1 id="x">X</h1>
                        <h1>Personal Details Change Tab</h1>
                        <p>Type your new name, surname and number</p>
                        <input placeholder="new name" type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        <input placeholder="new surname" type="text" value={surname} onChange={(e)=>{setSurname(e.target.value)}}/>
                        <input placeholder="new number" type="text" value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
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
                </div> : null}
                {activeProfilePicture ? <div className="hidden-profile-settings">
                    <div className="password-changer">
                        <h1 id="x">X</h1>
                        <h1>Profile Picture Change Tab</h1>
                        <img id="newprofilepicture" src={profilePicture} />
                        <input id="profilepictureuploader" type="file" value={name} onChange={(e)=>{
                            
                        }}/>
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
                </div> : null}
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
                <div onClick={()=>setActivePassword(true)} className="profile-change-password profile">
                    <i class="ri-lock-password-fill"></i> Change Password
                </div>
                <div onClick={()=>setActiveName(true)} className="profile-change-name-surname profile">
                    <i class="ri-edit-line"></i> Change Name, Surname and Number
                </div>
                <div onClick={()=>setActiveProfilePicture(true)} className="profile-change-profilepicture profile">
                    <i class="ri-image-edit-fill"></i> Change your profile picture 
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings;