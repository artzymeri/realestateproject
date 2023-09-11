import React, { useEffect, useState } from "react";
import axios from "axios";


const DeleteEstates = () => {


    const [estatesData, setEstatesData] = useState([]);
    const [refreshNumber, setRefreshNumber] = useState(1); 

    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
            setEstatesData(response.data);
            console.log(response.data);
        })
    }
    ,[refreshNumber]);

    



    return(
        <div className="edit-estates-body">
            <div className="edit-estates-nav"><h1>Rubrika për fshirjen e shpalljeve</h1></div>
            <div className="edit-estates-content">
                <div className="edit-estates-content-table">
                    <h1 className="edit-row-line">titulli</h1>
                    <h1 className="edit-row-line">metri Katrorë</h1>
                    <h1 className="edit-row-line">lokacioni</h1>
                    <h1 className="edit-row-line">çmimi</h1>
                    <h1 className="edit-row-line">shpallja</h1>
                    <h1 className="edit-row-line">lloji shpalljes</h1>
                    <h1 className="edit-row-line">butoni për editim</h1>
                    </div>
                {estatesData.map((estate)=>{
                    return (
                        <div className="edit-estates-row" >  
                            <h1 className="edit-row-title edit-row-line">{estate.title}</h1>
                            <h1 className="edit-row-meter edit-row-line">{estate.meter}</h1>
                            <h1 className="edit-row-location edit-row-line">{estate.location}</h1>
                            <h1 className="edit-row-price edit-row-line">{estate.price}</h1>
                            <h1 className="edit-row-posting edit-row-line">{estate.posting}</h1>
                            <h1 className="edit-row-type edit-row-line">{estate.type}</h1>
                            <button className="edit-row-button edit-row-line" onClick={()=>{
                                try{
                                    axios.delete(`http://localhost:8080/deleteestates/${estate.id}`);
                                    window.alert('Shpallja u fshi me sukses!');
                                    setRefreshNumber(refreshNumber + 1)
                                }catch(error){
                                    console.log(error)
                                }
                            }}>Fshij Shpalljen</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DeleteEstates;