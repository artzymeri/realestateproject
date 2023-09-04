import React from "react";
import './EstatesFilter.css'


const EstatesFilter = () => {

    const estateFilterElement = document.querySelector('.estates-filter-wrapper');
    const bodyElement = document.body;

    const removeFilter = () => {
        estateFilterElement.classList.remove('active');
        bodyElement.classList.remove('active');
    }

    return (
        <div className="estates-filter-wrapper">
            <div className="estates-filter-top"><h1>Filter</h1><button onClick={removeFilter}><i class="ri-close-fill"></i></button></div>
            <div className="estates-filter-card">
                <div className="estates-filter-price">
                    <input type="number"/><input type="number"/>
                </div>
                <div className="estates-filter-type">
                    <input type="text"/></div>
                <div className="estates-filter-posting"><input type="text"/>
                </div>
                <div className="estates-filter-location">
                    <input type="text"/>
                    </div>
                <div className="estates-filter-meter">
                    <input type="number"/>
                </div>
            </div>
            <div className="estates-filter-bottom"><h1>Fshi të gjitha</h1><button>Kërko</button></div>
        </div>
    )
     
}

export default EstatesFilter;