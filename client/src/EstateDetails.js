import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import './EstateDetails.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './EstatesFilter.css';
import './EstatesFilterButtons.css';
import { Navigation, Pagination, A11y, EffectFade } from 'swiper/modules';

const EstateDetails = () => {
    const { index } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
         axios.get(`http://localhost:8080/getestatedetails/${index}`).then((response) => {
            setData(response.data[0]);
            console.log(data)
         }).catch((error) => {
            console.error("Error fetching estate details:", error);
         });
    }, []);


    console.log(data.images)

    return (
        <div className="estate-details-body">
            <div className="estate-details-content">
                <div className="estate-details-content-left">
                    <div className="estate-details-element">
                            <h1>{data.posting}</h1>
                            <h1>{data.type}</h1>
                            <h1>{data.price}€</h1>
                            <h1>{data.meter}m<sup>&sup2;</sup></h1>
                            <h1>{data.title}</h1><h1>{data.location}</h1>
                    </div>
                    <Swiper id="estate-details-swiper"
                    modules={[Navigation, Pagination, A11y, EffectFade]}
                    navigation
                    slidesPerView={1}
                    >
                        {data.images && JSON.parse(data.images).map((image)=>{
                            return(
                                <SwiperSlide id="estate-details-swiper-slide">
                                    <img  src={image} />
                                    <h1 className="estate-swiper-abs-left">{data.posting}</h1>
                                    <h1 className="estate-swiper-abs-right">{data.type}</h1>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <div className="estate-details-characteristics-container">
                        {data.characteristics && JSON.parse(data.characteristics).map((item)=>{
                            return(
                            <h1>{item}</h1>
                            )
                        })}
                    </div>
                    <div className="estate-details-description">{data.description}</div>
                </div>
                <div className="estate-details-content-right">
                        <div className="estate-details-content-right-child">
                            <h1>Kontakto me agjentin</h1>
                            <div className="estate-details-agent">
                                <img src={data.agentprofilepicture} />
                                <div className="estate-details-agentdetails">
                                    <h1>{data.agentname}</h1>
                                    <h1>{data.agentnumber}</h1>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default EstateDetails;
