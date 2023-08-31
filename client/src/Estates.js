import React, { useEffect, useState } from "react";
import axios from "axios";
import './Estates.css'

const Estates = () => {

    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
             setData(response.data);
             console.log(response.data);
        })
    }
    ,[])

    return (
        <div className="estates-page-body">
            
        </div>
    );
}

export default Estates;