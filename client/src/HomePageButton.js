import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePageButton = () => {
    const navigate = useNavigate();

    const handleHomePageNav = () => {
        navigate('/');
    };

    return (
        <button onClick={handleHomePageNav} id='homebutton'>Go Back To Home Page</button>
    );
};

export default HomePageButton;
