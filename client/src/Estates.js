import React, { useEffect, useState } from "react";
import axios from "axios";
import './Estates.css';
import EstatesTestTable from "./EstatesTestTable";
import { Navigate, useNavigate } from "react-router-dom";

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
                            <h1>{estate.title}</h1>
                            <h1>{estate.meter}</h1>
                            <h1>{estate.location}</h1>
                            <h1>{estate.posting}</h1>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Estates;