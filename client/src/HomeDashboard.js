import React, { useEffect, useState } from "react";
import axios from "axios";
import './HomeDashboard.css'



const HomeDashboard = () => {

    const [estatesData, setEstatesData] = useState([]);
    const [requestsData, setRequestsData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
            setEstatesData(response.data);
        })
        axios.get('http://localhost:8080/registerrequests').then((response)=>{
            setRequestsData(response.data);
        })
    }
    ,[])

    return(
        <div className="edit-estates-body">
            <div className="edit-estates-nav"><h1>Home Tab</h1></div>
            <div className="home-dashboard-content">
                <div className="home-dashboard-element">Numri i shpalljeve : <p className="home-number-data">{estatesData.length}</p></div>
                <div className="home-dashboard-element">Numri i kerkesave per regjistrim : <p className="home-number-data">{requestsData.length}</p></div>
            </div>
        </div>
        
    )
}

export default HomeDashboard;