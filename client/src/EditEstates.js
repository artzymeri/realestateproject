import React, { useEffect, useState } from "react";
import axios from "axios";
import './EditEstates.css';
import Select from 'react-select';

const EditEstates = () => {

    const [estatesData, setEstatesData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/get').then((response)=>{
            setEstatesData(response.data);
        })
    }
    ,[])

    const [activeEstate, setActiveEstate] = useState(null);

    const activateEstate = (estateIndex) => {
        if(activeEstate == null){
            setActiveEstate(estateIndex);
        } else {
            setActiveEstate(null)
        }
        
    }

    

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          borderStyle: 'solid',
          borderColor: 'rgb(36,36,36)',
          borderRadius: '3px',
          width : '550px',
          backgroundColor: '#f3c68c',
          color: 'black',
          cursor: 'pointer',
          zIndex: 5,
          '&:hover' : {
            borderColor: 'rgb(36,36,36)'
          }
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? 'black' : '#f3c68c',
          color: state.isSelected ? '#f3c68c' : 'black',
          cursor: 'pointer',
          zIndex: '999',
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
            zIndex: '999',
          }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'black',
            '&:hover' : {
              color: 'rgb(36,36,36)'
            }
          }),
        indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: 'black',
          }),
      };

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
        { value: 'Lokal', label: 'Lokal' },
        { value: 'Tokë', label: 'Tokë' },

      ];

      const type = [
        { value: 'Në Shitje', label: 'Në Shitje' },
        { value: 'Me Qera', label: 'Me Qera' },
        { value: 'Marrëveshje', label: 'Marrëveshje' }

      ];

      const characteristicsOptions= [
        { value: '2 Banjo', label: '2 Banjo' },
        { value: 'E renovuar', label: 'E Renovuar' },
        { value: 'E Mobiluar', label: 'E Mobiluar' },
        { value: 'E PaMobiluar', label: 'E PaMobiluar' },
        { value: '24h Rrymë', label: '24h Rrymë' },
        { value: 'me fletë poseduese', label: 'me fletë poseduese'},
        { value: 'vendparking', label: 'vendparking'},
        { value: '1 dhomë gjumi', label: '1 dhomë gjumi'},
        { value: '2 dhoma gjumi', label: '2 dhoma gjumi'},

      ];

      const [title , setTitle] = useState();
    const [meter, setMeter] = useState();
    const [location, setLocation] = useState();
    const [images, setImages] = useState([]);
    const [data, setData] = useState([]);
    const [posting , setPosting] = useState();
    const [estateType, setEstateType] = useState();
    const [characteristics, setCharacteristics] = useState();
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleTitle = (e) =>{
        setTitle(e.target.value);
    }
    const handleMeter = (e) =>{
        setMeter(e.target.value);
    }
    const handleImages = (e) =>{
        setImages([...e.target.files]);
    };
    
    const handleDescription = (e) => {
      setDescription(e.target.value);
    };

    const handleSelectedLocation = (selectedOption) => {
        setLocation(selectedOption.value);
        console.log(location);
      }

      const handleSelectedPosting = (selectedOption) => {
        setPosting(selectedOption.value);
        console.log(posting)
      }

      const handleSelectedType = (selectedOption) => {
        setEstateType(selectedOption.value);
        console.log(estateType);
      }

      const handleSelectedCharacteristics = (selectedOptions) => {
        const characteristicsArray = [];
        for (const characteristic of selectedOptions) {
          characteristicsArray.push(characteristic.value);
        }
        const stringifiedCharacteristicsArray = JSON.stringify(characteristicsArray);
        setCharacteristics(stringifiedCharacteristicsArray);
        console.log(characteristics)
      }

      const handlePrice = (e) => {
        setPrice(e.target.value);
        console.log(price)
      }
     
    
   

    return(
        <div className="edit-estates-body">
            <div className="edit-estates-nav"><h1>Edit Estates Tab</h1></div>
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
                {estatesData.map((estate, index)=>{
                    return (
                        <div className="edit-estates-row" >
                            {activeEstate === index ? 
                                <>
                                <div className="edit-card-body">
                                    <div className="edit-card">
                                        <h1>{estate.title}</h1>
                                        <Select options={postings} placeholder='Selekto llojin e shpalljes' styles={customStyles} onChange={handleSelectedPosting} />
                                        <Select options={type} placeholder='Selekto Gjendjen e shpalljes' styles={customStyles} onChange={handleSelectedType} />
                                        <input type="text" placeholder="Shëno Titullin" onChange={handleTitle}/>
                                        <Select placeholder='Selekto Karakteristikat e Shpalljes' options={characteristicsOptions} styles={customStyles} onChange={handleSelectedCharacteristics} isMulti />
                                        <input type="text" placeholder="Shëno çmimin" onChange={handlePrice}/>
                                        <input type="number" placeholder="Shëno Metrën Katrorë"  onChange={handleMeter}/>
                                        <Select placeholder='Selekto Lokacionin' options={options} styles={customStyles} onChange={handleSelectedLocation} />
                                        <input className="input-files-edit" type="file" multiple  onChange={handleImages}/>
                                        <textarea id="long-text" placeholder="Shëno përshkrimin e shpalljes" name="comments" rows="4" cols="50" value={description} onChange={handleDescription}></textarea>
                                        <button className="edit-button" onClick={
                                      ()=>{

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
                                                          axios.post(`http://localhost:8080/editestate/${estate.id}`, { title: title, meter: meter, location: location, images: imagesArray, posting: posting, type: estateType, characteristics: characteristics, price: price, description: description });
                                                          window.alert('Editing has been completed successfully!');
                                                          window.location.reload();
                              
                                                       }
                                                  }
                                              }
                                          }catch(error){
                                              console.log(error)
                                          }
                                      } else {
                                          window.alert('Please Select Images to upload!')
                                      }
                                    }}>Edito Shpalljen</button> 
                                    <button className="edit-close-button" onClick={activateEstate}>x</button>
                                    </div>
                                </div>
                            </> 
                            : null}
                            <h1 className="edit-row-title edit-row-line">{estate.title}</h1>
                            <h1 className="edit-row-meter edit-row-line">{estate.meter}</h1>
                            <h1 className="edit-row-location edit-row-line">{estate.location}</h1>
                            <h1 className="edit-row-price edit-row-line">{estate.price}</h1>
                            <h1 className="edit-row-posting edit-row-line">{estate.posting}</h1>
                            <h1 className="edit-row-type edit-row-line">{estate.type}</h1>
                            <button className="edit-row-button edit-row-line" onClick={()=> activateEstate(index)}>Edito Shpalljen</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EditEstates;