import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageAgents = () => {

    const [requestData, setRequestData] = useState([])


    useEffect(()=>{
        axios.get('http://localhost:8080/registerrequests').then((response)=>{
            console.log(response.data)
            setRequestData(response.data)
        })
    }
    ,[])

    return(
        <div>
            {requestData.map((userRequest)=>{
                return(
                    <div>
                        {userRequest.name}
                        {userRequest.surname}
                        {userRequest.number}
                        </div>
                )
            })}
        </div>
    )
}

export default ManageAgents;