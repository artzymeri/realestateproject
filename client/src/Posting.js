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
    const [estateType, setEstateType] = useState();
    const [characteristics, setCharacteristics] = useState();
    const [price, setPrice] = useState('');

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
                            axios.post('http://localhost:8080/insertnewestate', { title: title, meter: meter, location: location, images: imagesArray, posting: posting, type: estateType, characteristics: characteristics, price: price });
                            window.alert('Posting has been completed successfully!');
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

      ]
      
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
          zIndex: 999,
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
            zIndex: 999,
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
            <div className="posting-card">
              <div className="posting-card-left">
                  <label className="posting-label">Selekto Llojin e shpalljes</label>
                  <Select options={postings} styles={customStyles} onChange={handleSelectedPosting} />
                  <label className="posting-label">Selekto Gjendjen e shpalljes</label>
                  <Select options={type} styles={customStyles} onChange={handleSelectedType} />
                  <label className="posting-label" >Shëno Titullin</label>
                  <input type="text" className="posting-input" onChange={handleTitle}/>
                  <label className="posting-label">Selekto Karakteristikat e Shpalljes</label>
                  <Select options={characteristicsOptions} styles={customStyles} onChange={handleSelectedCharacteristics} isMulti />
              </div>
              <div className="posting-card-right"><label className="posting-label" >Shëno çmimin</label>
                  <input type="text" className="posting-input" onChange={handlePrice}/>
                  <label className="posting-label" >Shëno Metrën Katrorë</label>
                  <input type="number"  className="posting-input"  onChange={handleMeter}/>
                  <label className="posting-label">Selekto Lokacionin</label>
                  <Select options={options} styles={customStyles} onChange={handleSelectedLocation} />
                  <label className="element">Selekto fotografitë</label>
                  <input type="file" multiple  className="posting-file" onChange={handleImages}/>
              </div>
    
            </div>
            <button className="posting-button" onClick={submitPosting}>Posto Shpalljen</button> 
        </>
    )
}

export default Posting;