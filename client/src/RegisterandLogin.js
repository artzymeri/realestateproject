import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import './RegisterandLogin.css';
import axios from "axios";


const RegisterandLogin = () => {
    const navigate = useNavigate();
    const [registerState, setRegisterState] = useState(true);
    const [loginState, setLoginState] = useState(false);

    const [loginUsername, setLoginUsername] = useState();
    const [loginPassword, setLoginPassword] = useState();

    const [registerUsername, setRegisterUsername] = useState();
    const [registerPassword, setRegisterPassword] = useState();
    const [profilePicture, setProfilePicture] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

    const profilePictureHandler = (e) =>{
        const loadedProfilePicture = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(loadedProfilePicture);
        fileReader.onload = (e) => {
            setProfilePicture(e.target.result);
        }
    }

    const handleLoginUsername = (e) => {
        setLoginUsername(e.target.value);
    }

    const handleLoginPassword = (e) => {
        setLoginPassword(e.target.value);
    }

    const handleRegisteredUsername = (e) => {
        setRegisterUsername(e.target.value);
    }
    const handleRegisteredPassword = (e) => {
        setRegisterPassword(e.target.value);
    }

    const register = async () =>
     { 
       const response = await axios.get(`http://localhost:8080/getusername/${registerUsername}`);
       const success = await response.data.success;
       console.log(success);
       if (success) {
        window.alert('username exists')
       } else {
        axios.post('http://localhost:8080/register', { username : registerUsername, password: registerPassword, profilepicture: profilePicture } )
       }

    }

    const login = async () => {
        

        const response = await axios.post('http://localhost:8080/login', {
            username: loginUsername,
            password: loginPassword
        });
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            window.alert('Login successful');
            navigate('/posting');
        } else {
            window.alert('Login failed');
        }
    };

   

    const activateLogin = () => {
        setRegisterState(false);
        setLoginState(true);
    }
    

    const activateRegister = () => {
        setRegisterState(true);
        setLoginState(false);
    }


     return (
         <div className="register-and-login-body">
             { registerState ? 
                 
                 <div className="register-tab">
                 <label>Type your username</label>
                 <input type="text" required  id="username-input" onChange={handleRegisteredUsername} value={registerUsername}/>
                 <label>Type your password</label>
                 <input type="password" required id="username-input" onChange={handleRegisteredPassword} value={registerPassword}/>
                 <label>Insert your profile Picture</label>
                 <input type="file" onChange={profilePictureHandler} />
                 <img id="profilepicture" src={profilePicture}/>
                 <button onClick={register}>Register</button>
                 <div className="already-tab">
                    <p>You already have an account?</p>
                    <button onClick={activateLogin}>Login now</button>
                 </div>
             </div> 
             : null }
             { loginState ? 
             <div className="login-tab">
                 <label>Type your username</label>
                 <input type="text" id="username-input" required onChange={handleLoginUsername} value={loginUsername} />
                 <label>Type your password</label>
                 <input type="password" id="username-input" required onChange={handleLoginPassword} value={loginPassword}/>
                 
                 <button onClick={login}>Login</button>
                 <div className="already-tab">
                    <p>You don't have an account?</p>
                    <button onClick={activateRegister}>Register now</button>
                 </div>
             </div> 
             : null}
         </div>
     )
}

export default RegisterandLogin;