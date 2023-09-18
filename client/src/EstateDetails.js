import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EstateDetails = () => {
    const { index } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
         axios.get(`http://localhost:8080/getestatedetails/${index}`).then((response) => {
            console.log(response.data); 
            setData(response.data); 
         }).catch((error) => {
            console.error("Error fetching estate details:", error);
         });
    }, [index]);

    return (
        <div>
            <h1>Welcome to {index} Estate!</h1>
            <h1>{data.title}</h1>
        </div>
    )
}

export default EstateDetails;
