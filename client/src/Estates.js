import React, { useEffect, useState } from "react";
import axios from "axios";
import './Estates.css';
import EstatesTestTable from "./EstatesTestTable";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Estates = () => {

    const navigate = useNavigate();

    const estatesTable = EstatesTestTable;

    const [filterActive, setFilterActive] = useState(false);

    const activateFilter = () => {
        if(filterActive) {
            setFilterActive(false)
        } else {
            setFilterActive(true);
        }
    };

    const toHomePage = () => {
        return (
            navigate('/')
        )
    }

    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
             setData(response.data);
             console.log(response.data);
        })
    }
    ,[])

    return (
        <>
            <div className="estates-navbar">
                <div className="estates-logo-container" ><img src="logo.png" onClick={toHomePage} /><h1 onClick={toHomePage} >Heimer Real Estate</h1></div>
                <i class="ri-equalizer-fill" onClick={activateFilter}></i>
            </div>
            {filterActive ? <div className="estates-navbar-bottom">aa</div> : null}
            <div className="estates-container">
                {data.map((estate)=>{
                    return (
                        <div className="estate">
                            {estate.posting ? <h1 id="estate-posting">{estate.posting}</h1> : null}
                            {estate.type ? <h1 id="estate-type">{estate.type}</h1> : null}
                            <Swiper id="swiper-estate"
                                 slidesPerView={1}
                            >
                                {estate.images && JSON.parse(estate.images).map((image)=>{
                                    return(
                                    <SwiperSlide>
                                        <img id="slide-image" src={image}/>
                                    </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            <div className="estate-bottom-part">
                                <h1 id="estate-title">{estate.title}</h1>
                                <div className="estate-bottom-part-child-one">
                                        <h1>{estate.price}</h1>
                                        <h1 id="estate-meter">{estate.meter} m<sup>&sup2;</sup></h1>
                                        <h1><i class="ri-map-pin-line"></i> {estate.location}</h1>
                                </div>
                                <div className="estate-bottom-part-child-characteristics">
                                    {estate.characteristics && JSON.parse(estate.characteristics).map((characteristic)=>{return(<h1 id="characteristic">{characteristic}</h1>)})}
                                    <div id="characteristics-gradient"></div>
                                    </div>
                                <div className="estate-bottom-part-child2">
                                    <button>Shto tek favoritet</button>
                                    <button>Shiko Detajet</button>
                                </div>
                            </div>          
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Estates;