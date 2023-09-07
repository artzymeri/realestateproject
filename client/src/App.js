
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Estates from './Estates';
import Posting from './Posting'
import RegisterandLogin from './RegisterandLogin';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
import ProtectedRouteAgent from './ProtectedRouteAgent';
import Dashboard from './DashboardAdmin';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/estates' element={<Estates/>}></Route>
                <Route path="/registerandlogin" element={<RegisterandLogin />} />
                <Route path="/dashboard" element={<ProtectedRouteAdmin element={<Dashboard />} />} />
                <Route path="/posting" element={<ProtectedRouteAgent element={<Posting />} />} />
            </Routes>
        </Router>
    );
};

export default App;
