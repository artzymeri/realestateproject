
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Estates from './Estates';
import RegisterandLogin from './RegisterandLogin';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
import ProtectedRouteAgent from './ProtectedRouteAgent';
import DashboardAdmin from './DashboardAdmin';
import DashboardAgent from './DashboardAgent';
import EstateDetails from './EstateDetails';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/estates' element={<Estates/>}></Route>
                <Route path="/registerandlogin" element={<RegisterandLogin />} />
                <Route path="/dashboardadmin" element={<ProtectedRouteAdmin element={<DashboardAdmin />} />} />
                <Route path="/dashboardagent" element={<ProtectedRouteAgent element={<DashboardAgent />} />} />
                <Route path="/estate/:index" element={<EstateDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
