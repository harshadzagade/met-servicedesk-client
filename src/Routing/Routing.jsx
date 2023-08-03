import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import ResetPassword from '../Components/ResetPassword/ResetPassword';
import SingleStaff from '../Components/Staff/Superadmin/SingleStaff/SingleStaff';
import Home from '../Pages/Home/Home';
import CreateStaff from '../Components/Staff/Superadmin/CreateStaff/CreateStaff';
import Complaint from '../Pages/Complaint/Complaint';
import NewCompaint from '../Components/UI/NewTicket/NewComplaint/NewComplaint';
import ComplaintDetails from '../Components/UI/Details/ComplaintDetail/ComplaintDetails';
import TechComplaintDetails from '../Components/ComplaintPage/TechnicianComplaint/TechComplaintDetails/TechComplaintDetails';
import Request from '../Pages/Request/Request';
import NewRequest from '../Components/UI/NewTicket/NewRequest/NewRequest';
import RequestDetails from '../Components/UI/Details/RequestDetail/RequestDetails';
import AdminRequestDetails from '../Components/RequestPage/AdminRequest/RequestDetails/AdminRequestDetails';
import AdminApproval from '../Components/RequestPage/AdminRequest/RequestDetails/RequestApproval/AdminApproval';
import TechnicianAttendingForm from '../Components/ComplaintPage/TechnicianComplaint/TechnicianAttendingForm/TechnicianAttendingForm';
import DeleteStaffList from '../Components/Staff/Superadmin/Archive/DeleteStaffList';
import Service from '../Pages/Services/Service';
import TechnicianRequestDetails from '../Components/RequestPage/TechnicianRequest/TechnicianRequestDetails/TechnicianRequestDetails';
import SingleStaffDetails from '../Components/Staff/Admin/SingleStaffDetails/SingleStaffDetails';
import Sidebar from '../Components/Sidebar/Sidebar';
import TechnicianRequestAttendingForm from '../Components/RequestPage/TechnicianRequest/TechnicianRequestAttendingForm/TechnicianRequestAttendingForm';
import Report from '../Pages/Report/Report';
import ReportDetails from '../Components/UI/Details/ReportDetails/ReportDetails';
import ArchiveStaffDetails from '../Components/Staff/Superadmin/Archive/ArchiveStaffDetails/ArchiveStaffDetails';
import Department from '../Pages/Department/Department';
import Institute from '../Pages/Institute/Institute';
import SubadminActivities from '../Pages/SubadminActivities/SubadminActivities';
import SubadminSingleStaffDetails from '../Components/Staff/Subadmin/SingleStaffDetails/SubadminSingleStaffDetails';
import SubadminRequestDetails from '../Components/RequestPage/SubadminRequest/RequestDetails/SubadminRequestDetails';
import SubadminApproval from '../Components/RequestPage/SubadminRequest/RequestDetails/RequestApproval/SubadminApproval';
import NewPassword from '../Components/ResetPassword/NewPasword/NewPassword';

const Routing = () => {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/forgotpassword' element={<ResetPassword />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/department' element={<Department />} />
          <Route exact path='/institute' element={<Institute />} />
          <Route exact path='/createstaff' element={<CreateStaff />} />
          <Route exact path='/createstaff' element={<CreateStaff />} />
          <Route exact path='/complaint' element={<Complaint />} />
          <Route exact path='/report' element={<Report />} />
          <Route exact path='/reportdetails/:reportId' element={<ReportDetails />} />
          <Route exact path='/newcomplaint' element={<NewCompaint />} />
          <Route exact path='/complaintdetails/:complaintId' element={<ComplaintDetails />} />
          <Route exact path='/techcomplaintdetails/:complaintId' element={<TechComplaintDetails />} />
          <Route exact path='/techcomplaintattending/:complaintId' element={<TechnicianAttendingForm />} />
          <Route exact path='/techrequestattending/:requestId' element={<TechnicianRequestAttendingForm />} />
          <Route exact path='/newrequest' element={<NewRequest />} />
          <Route exact path='/requestdetails/:requestId' element={<RequestDetails />} />
          <Route exact path='/technicianRequestDetails/:requestId' element={<TechnicianRequestDetails />} />
          <Route exact path='/adminrequestdetails/:requestId' element={<AdminRequestDetails />} />
          <Route exact path='/subadminrequestdetails/:requestId' element={<SubadminRequestDetails />} />
          <Route exact path='/adminapproval/:requestId' element={<AdminApproval />} />
          <Route exact path='/subadminapproval/:requestId' element={<SubadminApproval />} />
          <Route exact path='/singlestaff/:staffId' element={<SingleStaff />} />
          <Route exact path='/archivestaff/:staffId' element={<ArchiveStaffDetails />} />
          <Route exact path='/request' element={<Request />} />
          <Route exact path='/passwordreset' element={<NewPassword />} />
          <Route exact path='/archive' element={<DeleteStaffList />} />
          <Route exact path='/subadminactivities' element={<SubadminActivities />} />
          <Route exact path='/services' element={<Service />} />
          <Route exact path='/adminstaffdetails/:staffId' element={<SingleStaffDetails />} />
          <Route exact path='/subadminstaffdetails/:staffId' element={<SubadminSingleStaffDetails />} />
        </Routes>
      </Sidebar>
    </Router>
  );
};

export default Routing;