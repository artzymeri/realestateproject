import React, { useEffect, useState } from "react";
import axios from "axios";


const DeleteEstates = () => {


    const [estatesData, setEstatesData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
            setEstatesData(response.data);
        })
    }
    ,[])

    

    return(
        <div className="delete-estates-body">
            <div className="delete-estates-navbar">navbar</div>
            <div className="delete-estates-content">
                {estatesData.map((estate)=>{
                    return(
                        <div className="delete-estates-row">
                            <h1>{estate.title}</h1>
                            <button>Fshi Shpalljen</button>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default DeleteEstates;