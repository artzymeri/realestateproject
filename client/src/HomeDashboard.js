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
            <div className="edit-estates-nav">Rubrika Kryesore | Ballina</div>
            <div className="home-dashboard-content">
                <div className="home-dashboard-element">Numri i shpalljeve : {estatesData.length}</div>
                <div className="home-dashboard-element">Numri i kerkesave per regjistrim : {requestsData.length}</div>
            </div>
        </div>
        
    )
}

export default HomeDashboard;