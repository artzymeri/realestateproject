
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EstatesButton = () => {
    const navigate = useNavigate();

    const handleEstatesPageNav = () => {
        navigate('/estates');
    };

    return (
        <button onClick={handleEstatesPageNav} id='estates-button'>Click to View Estates</button>
    );
};

export default EstatesButton;
