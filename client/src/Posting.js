import React, { useEffect, useState } from "react";
import './Posting.css';
import LogoutButton from "./LogoutButton";
import Select from 'react-select';
import axios from 'axios';



const Posting = () => {
    const [title , setTitle] = useState();
    const [meter, setMeter] = useState();
    const [location, setLocation] = useState();
    const [images, setImages] = useState([]);
    const [data, setData] = useState([]);
    const [posting , setPosting] = useState();

    const handleTitle = (e) =>{
        setTitle(e.target.value);
    }
    const handleMeter = (e) =>{
        setMeter(e.target.value);
    }
    const handleImages = (e) =>{
        setImages([...e.target.files]);
    };

    
    

    const submitPosting = () => {
        if (images.length > 0) {
            try {
                const imagesArray = [];
                for (const file of images){
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = (e) => {
                         const imageData = e.target.result;
                         imagesArray.push(imageData);
                         if (imagesArray.length === images.length){
                            console.log(imagesArray);
                            axios.post('http://localhost:8080/insertnewestate', { title: title, meter: meter, location: location, images: imagesArray, posting: posting });
                            window.alert('Posting has been completed successfully!')
                         }
                    }
                }
            }catch(error){
                console.log(error)
            }
        } else {
            window.alert('Please Select Images to upload!')
        }
    }

    useEffect(()=> {
         axios.get('http://localhost:8080/get').then((response)=>{
             console.log(response);
             setData(response.data);
         })
    }, [])

    const options = [
        { value: 'Vushtrri', label: 'Vushtrri' },
        { value: 'Prishtinë', label: 'Prishtinë' },
        { value: 'Mitrovicë', label: 'Mitrovicë' },
        { value: 'Gjakovë', label: 'Gjakovë' },
        { value: 'Gjilan', label: 'Gjilan' },
        { value: 'Pejë', label: 'Pejë' },
        { value: 'Klinë', label: 'Klinë' },
        { value: 'Skenderaj', label: 'Skenderaj' },
        { value: 'Lipjan', label: 'Lipjan' },
        { value: 'Ferizaj', label: 'Ferizaj' },
        { value: 'Viti', label: 'Viti' },
        { value: 'Kaçanik', label: 'Kaçanik' },


        
      ]

      const postings = [
        { value: 'Banesë', label: 'Banesë' },
        { value: 'Shtëpi', label: 'Shtëpi' },
        { value: 'Zyre', label: 'Zyre' },
        { value: 'Parcelë', label: 'Parcelë' },

      ]
      
      const handleSelectedLocation = (selectedOption) => {
        setLocation(selectedOption.value);
        console.log(location);
      }

      const handleSelectedPosting = (selectedOption) => {
        setPosting(selectedOption.value);
      }

      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          border: '1px solid #ccc',
          borderRadius: '3px',
          width : '550px',
          backgroundColor: '#f3c68c',
          color: 'black',
          cursor: 'pointer',
          zIndex: 5,
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? 'black' : '#f3c68c',
          color: state.isSelected ? '#f3c68c' : 'black',
          cursor: 'pointer',
          zIndex: '5',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'black',
        }),
        menu: (provided) => ({
            ...provided,
            borderStyle: 'none',
            cursor: 'pointer',
            backgroundColor: '#f3c68c',
            zIndex: 5,
          }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'black',
          }),
        indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: 'black',
          }),
      };
      

    return (
        <>
        <div className="posting-body">
            <div className="posting-card">
                <div className="logo-div-posting"><img id="login-register-logo" src="logo.png" /><h1>Posting Page</h1></div>
                <label className="posting-label">Selekto Llojin e shpalljes</label>
                <Select options={postings} styles={customStyles} onChange={handleSelectedPosting} />
                <label className="posting-label" >Shëno Titullin</label>
                <input type="text" className="posting-input" onChange={handleTitle}/>
                <label className="posting-label" >Shëno Metrën Katrorë</label>
                <input type="number"  className="posting-input"  onChange={handleMeter}/>
                <label className="posting-label">Selekto Lokacionin</label>
                <Select options={options} styles={customStyles} onChange={handleSelectedLocation} />
                <label className="element">Selekto fotografitë</label>
                <input type="file" multiple  className="posting-file" onChange={handleImages}/>
                <button className="posting-button" onClick={submitPosting}>Posto Shpalljen</button>
                
            </div>
            <LogoutButton />
        </div>
        </>
    )
}

export default Posting;