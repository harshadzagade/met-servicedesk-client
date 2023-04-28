import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import StaffDetailsAdminView from '../Staff/Admin/StaffDetails/StaffDetailsAdminView';
import CreateStaff from '../Staff/SuperAdmin/CreateStaff/CreateStaff';
import StaffDetailsSuperAdminView from '../Staff/SuperAdmin/StaffDetails/StaffDetailsSuperAdminView';
import Trash from '../Staff/SuperAdmin/Trash/Trash';
import StaffDetailsTrashView from '../Staff/SuperAdmin/Trash/StaffDetails/StaffDetailsTrashView';
import ResetPassword from '../Components/ResetPassword/ResetPassword';
import NewStaff from '../Staff/NewStaff/NewStaff';

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/resetpassword' element={<ResetPassword />} />
                <Route exact path='/' element={<Home />} />
                <Route exact path='/passwordreset' element={<NewStaff />} />
                <Route exact path='/superadmin/:staffId' element={<StaffDetailsSuperAdminView />} />
                <Route exact path='/superadmin/createstaff' element={<CreateStaff />} />
                <Route exact path='/admin/:staffId' element={<StaffDetailsAdminView />} />
                <Route exact path='/trash' element={<Trash />} />
                <Route exact path='/trash/:staffId' element={<StaffDetailsTrashView />} />
            </Routes>
        </Router>
    );
};

export default Routing;