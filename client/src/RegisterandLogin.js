import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


import './RegisterandLogin.css';
import axios from "axios";
import HomePageButton from "./HomePageButton";


const RegisterandLogin = () => {
    const navigate = useNavigate();
    const [registerState, setRegisterState] = useState(false);
    const [loginState, setLoginState] = useState(true);

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [number, setNumber] = useState('');

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

    const profilePictureHandler = (e) =>{
        if(e.target.files.length > 0){
        const loadedProfilePicture = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(loadedProfilePicture);
        fileReader.onload = (e) => {
            setProfilePicture(e.target.result);
            console.log(profilePicture)
            }
            
        }else {
            window.alert('Select an image')
            setProfilePicture('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
        }
    }

    const handleLoginUsername = (e) => {
        setLoginUsername(e.target.value);
    }

    const handleLoginPassword = (e) => {
        setLoginPassword(e.target.value);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleSurname = (e) => {
        setSurname(e.target.value);
    }

    const handleNumber = (e) => {
        setNumber(e.target.value);
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

            axios.get(`http://localhost:8080/getrequestusername/${registerUsername}`).then((response)=>{
                const exists = response.data.exists;
                if(exists){
                    window.alert('username exists')
                }else{
                    axios.post('http://localhost:8080/requestregister', { username : registerUsername, password: registerPassword, name: name , surname: surname, number: number, profilePicture: profilePicture } )
                    window.alert('successful register request')
                }
            })
       }

    }

    const login = async () => {
        

        const response = await axios.post('http://localhost:8080/login', {
            username: loginUsername,
            password: loginPassword
        });
        const adminToken = response.data.adminToken;
        const agentToken = response.data.agentToken;
        const usernameofUser = response.data.usernameofUser;
        const profilePictureofUser = response.data.profilePicture;
        if ( adminToken ) {
            localStorage.setItem('token', adminToken);
            localStorage.setItem('userRole', 'admin');
            localStorage.setItem('usernameofUser', usernameofUser);
            localStorage.setItem('profilepicture', profilePictureofUser);
            window.alert('Login successful as admin!');
            console.log(response.data)
            navigate('/dashboardadmin');
        } else if ( agentToken ) {
            localStorage.setItem('token', agentToken);
            localStorage.setItem('userRole', 'agent')
            window.alert('Login successful as agent!');
            localStorage.setItem('usernameofUser', usernameofUser);
            localStorage.setItem('profilepicture', profilePictureofUser);
            navigate('/dashboardagent');
            console.log(response.data)
        } else{
            window.alert('Login unsuccessful!')
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
            <HomePageButton />
             { registerState ? 
                 
            <div className="register-tab">
                <div className="logo-div"><img id="login-register-logo" src="logo.png" /><h1>Register Page</h1></div>
                <div className="register-left">
                    <div id="register-div">
                        <label id="register-label">Type your name</label>
                        <input type="text" required  id="register-input" onChange={handleName} value={name}/>
                    </div>
                    <div id="register-div">
                        <label id="register-label">Type your surname</label>
                        <input type="text" required  id="register-input" onChange={handleSurname} value={surname}/>
                    </div>
                    <div id="register-div">
                        <label id="register-label">Type your number</label>
                        <input type="number" required  id="register-input" onChange={handleNumber} value={number}/>
                    </div>
                    <div id="register-div">
                        <label id="register-label">Type your username</label>
                        <input type="text" required  id="register-input" onChange={handleRegisteredUsername} value={registerUsername}/>
                    </div>
                    <div id="register-div">
                        <label>Type your password</label>
                        <input type="password" required id="register-input" onChange={handleRegisteredPassword} value={registerPassword}/>
                    </div>
                    <div id="register-div">
                        <label id="register-label">Insert your profile Picture</label>
                        <input id="register-input-file" type="file" onChange={profilePictureHandler} />
                    </div>
                 </div>
                 <div className="register-right">
                    <img id="profilepicture" src={profilePicture}/>
                    <div className="name-surname">
                        <h1>{name.length === 0 ? 'Your Name' : name}</h1>
                        <h1>{surname.length === 0 ? 'Your Surname' : surname}</h1>
                        <h1>{number.length === 0 ? 'Your Number' : number}</h1>
                    </div>
                 </div>
                 <div className="bottom-tab">
                    <button id="register-login-button" onClick={register}>Register</button>
                    <div className="already-tab">
                        <p>You already have an account?</p>
                        <button id="register-login-button" onClick={activateLogin}>Login now</button>
                    </div>
                 </div>
             </div> 
             : null }
             { loginState ? 
             <div className="login-tab">
                <div className="logo-div"><img id="login-register-logo" src="logo.png" /><h1>Login Page</h1></div>
                 <label>Type your username</label>
                 <input type="text" id="username-input" required onChange={handleLoginUsername} value={loginUsername} />
                 <label>Type your password</label>
                 <input type="password" id="username-input" required onChange={handleLoginPassword} value={loginPassword}/>
                 
                 <button id="register-login-button" onClick={login}>Login</button>
                 <div className="already-tab">
                    <p>You don't have an account?</p>
                    <button id="register-login-button" onClick={activateRegister}>Register now</button>
                 </div>
             </div> 
             : null}
         </div>
     )
}

export default RegisterandLogin;