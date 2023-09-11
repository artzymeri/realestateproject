import React, { useEffect, useState } from "react";
import axios from "axios";
import './HomeDashboard.css'



const HomeDashboard = () => {

    const [estatesData, setEstatesData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
            setEstatesData(response.data);
        })
    }
    ,[])

    return(
        <div className="edit-estates-body">
            <div className="edit-estates-nav">Rubrika Kryesore | Ballina</div>
            <div className="home-dashboard-content">
                <div className="home-dashboard-element">Numri i shpalljeve : {estatesData.length}</div>
                <div className="home-dashboard-element">Numri i agjentëve : {estatesData.length}</div>
            </div>
        </div>
        
    )
}

export default HomeDashboard;