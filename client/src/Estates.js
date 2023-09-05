import React, { useEffect, useState } from "react";
import axios from "axios";
import './Estates.css';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './EstatesFilter.css';
import './EstatesFilterButtons.css'

const Estates = () => {
    

    const removeFilter = () => {
        estatesFilterElement.classList.remove('active');
        bodyElement.classList.remove('active');
    }

    const navigate = useNavigate();

    const bodyElement = document.body;

    const estatesFilterElement = document.querySelector('.estates-filter-wrapper');


    const activateFilter = () => {
            bodyElement.classList.add('active');
            estatesFilterElement.classList.add('active');
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
             setFilteredData(response.data);
             console.log(response.data);
        })
    }
    ,[])

    const [title , setTitle] = useState('');
    const [meter, setMeter] = useState('');
    const [location, setLocation] = useState('');
    const [posting , setPosting] = useState('');
    const [estateType, setEstateType] = useState('');
    const [characteristics, setCharacteristics] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [filteredData, setFilteredData] = useState([]);


    const filteringAction = () => {
        let filtered = data;

        if(location !== '') {
            filtered = filtered.filter((estate)=> estate.location.toLowerCase().includes(location.toLowerCase()))
        }
        if(meter !== '') {
            filtered = filtered.filter((estate)=> parseInt(estate.meter) == parseInt(meter))
        }
        if(title !== '') {
            filtered = filtered.filter((estate)=> estate.title.toLowerCase().includes(title.toLowerCase()))
        }
        if(minPrice !== '' && maxPrice !== ''){
            filtered = filtered.filter((estate)=> parseInt(minPrice) <= estate.price && parseInt(maxPrice) >= estate.price)
        }
        
        setFilteredData(filtered);
        estatesFilterElement.classList.remove('active');
        bodyElement.classList.remove('active');
    }

    const resetFilter = () => {
        setLocation('');
        setMeter('');
        setPosting('');
        setTitle('');
        setEstateType('');
        setCharacteristics('');
        setMinPrice('');
        setMaxPrice('');
    }

    const shtepiTrigger = () => {
        const shtepiButton = document.getElementById('estates-filter-button-shtepi');
        if(shtepiButton.classList.contains('active')){
            shtepiButton.classList.remove('active')
        } else{
            shtepiButton.classList.add('active')
        }
    }
    const banesaTrigger = () => {
       const banesaButton = document.getElementById('estates-filter-button-banesa');
       if(banesaButton.classList.contains('active')){
        banesaButton.classList.remove('active')
    } else{
        banesaButton.classList.add('active')
    }
    }
    const zyreTrigger = () => {
       const zyreButton = document.getElementById('estates-filter-button-zyre');
       if(zyreButton.classList.contains('active')){
        zyreButton.classList.remove('active')
    } else{
        zyreButton.classList.add('active')
    }
    }
    const lokaleTrigger = () => {
        const lokaleButton = document.getElementById('estates-filter-button-lokale');
        if(lokaleButton.classList.contains('active')){
            lokaleButton.classList.remove('active')
        } else{
            lokaleButton.classList.add('active')
        }
    }
    const tokaTrigger = () => {
       const tokaButton = document.getElementById('estates-filter-button-toka');
       if(tokaButton.classList.contains('active')){
        tokaButton.classList.remove('active')
       } else{
        tokaButton.classList.add('active')
    }
    }

    return (
        <>
            <div className="estates-navbar">
                <div className="estates-logo-container" ><img src="logo.png" onClick={toHomePage} /><h1 onClick={toHomePage} >Heimer Real Estate</h1></div>
                <i class="ri-equalizer-fill" onClick={activateFilter}></i>
            </div>
            <div className="estates-filter-wrapper">
            <div className="estates-filter-top"><h1>Filter</h1><button onClick={removeFilter}><i class="ri-close-fill"></i></button></div>
            <div className="estates-filter-card">
                <div className="estates-filter-price">
                    <input type="number" value={minPrice} onChange={(e)=>{setMinPrice(e.target.value)}} placeholder="Min Price"/><input type="number" placeholder="max price" value={maxPrice} onChange={(e)=>{setMaxPrice(e.target.value)}} />
                </div>
                <div className="estates-filter-title">
                    <input type="text" value={title} placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}} />
                </div>
                <div className="estates-filter-type">
                    <button id="estates-filter-button-banesa" onClick={banesaTrigger} >Banesa</button>
                    <button id="estates-filter-button-shtepi" onClick={shtepiTrigger}>Shtëpi</button>
                    <button id="estates-filter-button-zyre" onClick={zyreTrigger}>Zyre</button>
                    <button id="estates-filter-button-lokale" onClick={lokaleTrigger}>Lokale</button>
                    <button id="estates-filter-button-toka" onClick={tokaTrigger}>Toka</button>
                </div>
                <div className="estates-filter-posting">
                    <button id="estates-filter-button">Në shitje</button>
                    <button id="estates-filter-button">Me qera</button>
                    <button id="estates-filter-button">Me marrëveshje</button>
                </div>
                <div className="estates-filter-location">
                    <input type="text" value={location} placeholder="location" onChange={(e)=>{setLocation(e.target.value)}}/>
                    </div>
                <div className="estates-filter-meter">
                    <input type="number" placeholder="meter" onChange={(e)=>{setMeter(e.target.value)}} value={meter} />
                </div>
            </div>
            <div className="estates-filter-bottom"><h1 onClick={resetFilter}>Fshi të gjitha</h1><button onClick={filteringAction}>Kërko</button></div>
        </div>
            <div className="estates-container">
                {filteredData.map((estate)=>{
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
                                        <h1>{estate.price}€</h1>
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