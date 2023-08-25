import React, { useEffect, useState } from "react";
import axios from "axios";

const Estates = () => {

    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
             setData(response.data);
             console.log(response);
        })
    }
    ,[])

    return (
        <div>
            a
        </div>
    );
}

export default Estates;