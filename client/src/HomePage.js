import React from "react";
import './HomePage.css';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    const loginPageNav = () => {
        return (
        navigate('/registerandlogin')
        )
    }

    return (
        <>
             <div className="section section-one">
                 
                 <div className="navigation-bar">
                    <div className="logo-container">
                         <img id="logo" src="logo.png" />
                         <h1>Heimer Real Estate</h1>
                    </div>
                    <div className="login-container" onClick={loginPageNav}>
                        <i class="ri-user-fill"></i>
                        <h1>Log in as an agent</h1>
                    </div>
                 </div>
                 <div className="bottom-bar">
                     <h1>© HEIMER REAL ESTATE ALL RIGHTS RESERVED 2023</h1>
                     <div className="social-container">
                         <div className="social-element"><i class="ri-instagram-fill"></i><p>instagram</p></div>
                         <div className="social-element"><i class="ri-facebook-circle-fill"></i><p>facebook</p></div>
                         <div className="social-element"><i class="ri-phone-fill"></i><p>phone</p></div>
                     </div>
                 </div>
             </div>
        </>
    )
}

export default HomePage;