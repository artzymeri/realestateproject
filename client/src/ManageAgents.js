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
                            <button className="agent-button" onClick={()=>{
                                const {username, name, surname, password, number, profilepicture }= agent;
                                try{
                                    axios.post('http://localhost:8080/register', { username : username, password: password, name: name , surname: surname, number: number, profilepicture: profilepicture } );   
                                    axios.delete(`http://localhost:8080/deleteregisterrequest/${agent.id}`);
                                    window.alert('Successful Approval!')
                                }
                                catch(error){
                                    console.log(error);
                                    window.alert('Error!')
                                }
                            }}>Approve</button>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ManageAgents;






// const register = async () =>
//      { 
//        const response = await axios.get(`http://localhost:8080/getusername/${registerUsername}`);
//        const success = await response.data.success;
//        if (success) {
//         window.alert('username exists')
//        } else {

//             axios.get(`http://localhost:8080/getrequestusername/${registerUsername}`).then((response)=>{
//                 const success = response.data.success;
//                 if(success){
//                     window.alert('username exists')
//                 }else{
//                     axios.post('http://localhost:8080/requestregister', { username : registerUsername, password: registerPassword, name: name , surname: surname, number: number, profilePicture: profilePicture } )
//                     window.alert('successful register request');
//                     setRegisterUsername('');
//                     setRegisterPassword('');
//                     setName('');
//                     setSurname('');
//                     setNumber('');
//                     setProfilePicture('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
//                 }
//             })
//        }

//     }



// app.post('/register' , (req, res)=>{
//     const sqlInsert = 'INSERT INTO users_table (username, password, role, profilepicture) VALUES (?, ?, ?, ?)';
//     const {username, password, profilepicture} = req.body;
//     const role = 'none';

//     const hashedPassword = bcrypt.hashSync(password, 10); 

//     db.query(sqlInsert, [username, hashedPassword, role, profilepicture], (error, result) => {
//         if(error) {
//             console.log(error);
//         } else {
//             console.log(result);
//         }
//     })
// });