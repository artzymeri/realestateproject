import React from "react";
import './HomePage.css';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import EstatesButton from "./EstatesButton";

const HomePage = () => {

    const navigate = useNavigate();

    const loginPageNav = () => {
        return (
        navigate('/registerandlogin')
        )
    }

    return (
        <>
             <div className="loading"><img src="logo.png"/><h1>Heimer Real Estate</h1></div>
             <div className="section section-one">
                 
                 <div className="navigation-bar">
                    <div className="logo-container">
                         <img id="logo" src="logo.png"/>
                         <h1>Heimer Real Estate</h1>
                    </div>
                    <div className="login-container" onClick={loginPageNav}>
                        <i class="ri-user-fill"></i>
                        <h1>Log in as an agent</h1>
                    </div>
                 </div>
                 <div className="swiper-obtainer">
                    <Swiper
                        slidesperView={1}
                    >
                        <SwiperSlide>
                            <div className="estates">
                                <div className="estates-wrapper">
                                    <div className="estates-part1">
                                         <div className="estates-check">
                                            <h1>Browse through your dreams!</h1>
                                            <EstatesButton />
                                         </div>
                                    </div>
                                    <div className="estates-part2">
                                        <div className="estates-part2-filler"></div>           
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="about">
                                <div className="about-wrapper">
                                    <div className="about-part1">
                                            <h1>About US</h1>
                                            <p>"At Heimer Real Estate, we're your real estate journey's compass.
                                                 With years of experience, we specialize in turning aspirations into addresses.
                                                  Our team's local knowledge and passion create a seamless path in the dynamic property landscape.
                                                   Join us to discover a personalized approach that transforms real estate goals into achievements."</p>
                                    </div>
                                    <div className="about-part2">
                                        <div className="about-part2-filler"></div>           
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                    </Swiper>
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