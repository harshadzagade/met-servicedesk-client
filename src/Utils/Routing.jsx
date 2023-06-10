import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import StaffDetailsAdminView from '../Components/Staff/Admin/StaffDetails/StaffDetailsAdminView';
import CreateStaff from '../Components/Staff/SuperAdmin/CreateStaff/CreateStaff';
import StaffDetailsSuperAdminView from '../Components/Staff/SuperAdmin/StaffDetails/StaffDetailsSuperAdminView';
import Trash from '../Components/Staff/SuperAdmin/Trash/Trash';
import StaffDetailsTrashView from '../Components/Staff/SuperAdmin/Trash/StaffDetails/StaffDetailsTrashView';
import ResetPassword from '../Components/ResetPassword/ResetPassword';
import NewStaff from '../Components/Staff/NewStaff/NewStaff';
import Complaint from '../Pages/Complaint/Complaint';
import Services from '../Pages/Services/Services';
import Request from '../Pages/Request/Request';
import Report from '../Pages/Report/Report';
import AdminRequestDetails from '../Components/RequestPage/AdminRequest/RequestDetails/RequestDetails';
import TechnicianRequestDetails from '../Components/Staff/Technician/AssignedRequests/RequestDetails/RequestDetails';
import ComplaintDetails from '../Components/Staff/Technician/DepartmentComplaints/ComplaintDetails/ComplaintDetails';
import Sidebar from '../Components/UI/Sidebar/Sidebar';

const Routing = () => {
    return (
        <Router>
            <Sidebar>
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
                    <Route exact path='/request' element={<Request />} />
                    <Route exact path='admin/requestdetails/:requestId' element={<AdminRequestDetails />} />
                    <Route exact path='technician/requestdetails/:requestId' element={<TechnicianRequestDetails />} />
                    <Route exact path='technician/complaintdetails/:complaintId' element={<ComplaintDetails />} />
                    <Route exact path='/complaint' element={<Complaint />} />
                    <Route exact path='/services' element={<Services />} />
                    <Route exact path='/report' element={<Report />} />
                </Routes>
            </Sidebar>
        </Router>
    );
};

export default Routing;