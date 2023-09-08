import React, { useEffect, useState } from "react";
import axios from "axios";
import './EditEstates.css';

const EditEstates = () => {

    const [estatesData, setEstatesData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
            setEstatesData(response.data);
        })
    }
    ,[])

    return(
        <div className="edit-estates-body">
            <div className="edit-estates-nav"><h1>Edit Estates Tab</h1></div>
            <div className="edit-estates-content">
                {estatesData.map((estate)=>{
                    return (
                        <div className="edit-estates-row">
                            <h1>{estate.title}</h1>
                            <h1>{estate.meter}</h1>
                            <h1>{estate.location}</h1>
                            <h1>{estate.price}</h1>
                            <h1>{estate.posting}</h1>
                            <h1>{estate.type}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EditEstates;