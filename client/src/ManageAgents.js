import React, { useEffect, useState } from "react";
import axios from "axios";
import './ManageAgents.css';

const ManageAgents = () => {

    const [requestData, setRequestData] = useState([]);
    const [refreshNumber, setRefreshNumber] = useState(1);


    useEffect(()=>{
        axios.get('http://localhost:8080/registerrequests').then((response)=>{
            setRequestData(response.data)
        })
    }
    ,[refreshNumber])

    console.log(requestData)

    return(
        <div className="manage-agents-body">
            <div className="manage-agents-nav"><h1>Manage Agents Tab</h1></div>
            <div className="manage-agents-content">
                <div className="manage-agents-content-table">
                    <h1>Name</h1>
                    <h1>Surname</h1>
                    <h1>Number</h1>
                    <h1>Profile Picture</h1>
                </div>
                {requestData.map((agent)=>{
                    return(
                    <div className="manage-agents-row">
                        <h1 className="manage-agents-row-line">{agent.name}</h1>
                        <h1 className="manage-agents-row-line">{agent.surname}</h1>
                        <h1 className="manage-agents-row-line">{agent.username}</h1>
                        <div className="manage-agents-row-line">
                            <img className="agent-profilepicture" src={agent.profilepicture} />
                        </div>
                        <div className="manage-agents-row-line manage-agents-button-container">
                            <button className="agent-button" onClick={()=>{
                                try{
                                    axios.delete(`http://localhost:8080/deleteregisterrequest/${agent.id}`);
                                    window.alert('Agent Register Request Deleted!');
                                    setRefreshNumber(refreshNumber + 1)
                                }catch(error){
                                    console.log(error)
                                }
                            }}>Delete</button>
                            <button className="agent-button">Aprove</button>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ManageAgents;