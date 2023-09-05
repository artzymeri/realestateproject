
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Estates from './Estates';
import Posting from './Posting'
import RegisterandLogin from './RegisterandLogin';
import ProtectedRoute from './ProtectedRoute';
import FilterTest from './FilterTest';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/estates' element={<Estates/>}></Route>
                <Route path="/registerandlogin" element={<RegisterandLogin />} />
                <Route path="/posting" element={<ProtectedRoute element={<Posting />} />} />
                <Route path="/estatesfilter" element={<FilterTest />} />
            </Routes>
        </Router>
    );
};

export default App;
