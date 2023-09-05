import React, { useEffect, useState } from "react";
import axios from "axios";
import './FilterTest.css'

const FilterTest = () => {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
             setData(response.data);
             console.log(data)
        })
    }
    ,[])

    const filterAction = () => {
        let filtered = data; 
        if (location !== '') {
            filtered = filtered.filter((estate) =>
                estate.location.toLowerCase().includes(location.toLowerCase())
            );
        }
    
        setFilteredData(filtered);
    }

    const resetFilter = () => {
        setType('');
        setLocation('');
        setFilteredData(data);
    }
    
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');

    

    return (
    <>
        <div className="input-filter-tab">
            <input type="text" value={type} onChange={(e)=>{setType(e.target.value)}} />
            <input type="text" value={location} onChange={(e)=>{setLocation(e.target.value)}} />
            <button onClick={filterAction}>Filter</button>
            <button onClick={resetFilter}>Reset</button>
        </div>
        <div className="estates-filter-test">
            {filteredData.map((estate)=>{
                return(
                <div className="estate-filter-card">
                    <h1>{estate.type}</h1>
                    <h1>{estate.location}</h1>
                </div>
                )
            })}
        </div>
    </>
    )
}

export default FilterTest;