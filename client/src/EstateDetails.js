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

    const imagesArray = JSON.parse(data.images);
    const characteristicsArray = JSON.parse(data.characteristics);

    console.log(data.images)

    return (
        <div className="estate-details-body">
            <div className="estate-details-content">
                <h1>{data.title}</h1>
                <h1>{data.meter} m<sup>&sup2;</sup></h1>
                <h1>{data.price}€</h1>
                <h1>{data.location}</h1>
                {/* <Swiper className="estate-details-swiper">
                    {imagesArray.map((image)=>{
                        return (
                            <SwiperSlide>
                                <img src={image} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper> */}
                <div className="estate-details-characteristics-container">
                    {characteristicsArray.map((item)=>{
                        return(
                        <h1>{item}</h1>
                        )
                    })}
                </div>
                <h1>{data.description}</h1>
            </div>
        </div>
    )
}

export default EstateDetails;
