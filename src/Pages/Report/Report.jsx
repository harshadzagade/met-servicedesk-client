import React, { Fragment, useEffect, useState } from 'react';
import DataPerPage from '../../Components/UI/DataPerPage/DataPerPage';
import classes from './Report.module.css';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import Sweetpagination from 'sweetpagination';

const Report = () => {
    const navigate = useNavigate();
    const [reportList, setReportList] = useState([]);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [departmentStaff, setDepartmentStaff] = useState([]);
    const [reportType, setReportType] = useState('full');
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await axios.get(`http://localhost:8001/api/staff/departments`);
            setDepartments(departments.data.departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const getList = async () => {
            if (selectedStaff) {
                try {
                    if (selectedDepartment.length !== 0) {
                        switch (reportType) {
                            case 'full':
                                const full = await axios.get(`http://localhost:8001/api/report/${selectedStaff}`);
                                setReportList(full.data.report);
                                break;

                            case 'requests':
                                const requests = await axios.get(`http://localhost:8001/api/report/request/${selectedStaff}`);
                                setReportList(requests.data.report);
                                break;

                            case 'complaints':
                                const complaints = await axios.get(`http://localhost:8001/api/report/complaint/${selectedStaff}`);
                                setReportList(complaints.data.report);
                                break;

                            default:
                                const defaultValue = await axios.get(`http://localhost:8001/api/report/${selectedStaff}`);
                                setReportList(defaultValue.data.report);
                                break;
                        }
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: `${error.response.data.message}`,
                        text: 'Unable to fetch requests'
                    });
                }
            }
        };
        getList();
        setRefresh(false);
    }, [selectedStaff, refresh, reportType, selectedDepartment]);

    useEffect(() => {
        const getStaffByDepartment = async () => {
            try {
                if (selectedDepartment.length !== 0) {
                    const staff = await axios.get(`http://localhost:8001/api/staff/staffbydepartment/${selectedDepartment}`);
                    setDepartmentStaff(staff.data.staff);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `${error.response.data.message}`,
                    text: 'Please enter valid credentials'
                });
            }
        };
        getStaffByDepartment();
    }, [selectedDepartment, departments])

    return (
        <Fragment>
            <div className={`${classes.basicSelection}`}>
                <div className={`${classes.departmentSelection}`}>
                    <div>Department:&nbsp;</div>
                    <select className={`${classes.dropdownSelect}`} onChange={(e) => setSelectedDepartment(e.target.value)}>
                        <option value='' hidden>Select department</option>
                        {
                            departments.map((department, key) => (
                                <option key={key} value={department}>{department}</option>
                            ))
                        }
                    </select>
                </div>
                {
                    departmentStaff.length !== 0 &&
                    <div className={`${classes.staffSelection}`}>
                        <div>Staff:&nbsp;</div>
                        <select className={`${classes.dropdownSelect}`} onChange={(e) => setSelectedStaff(e.target.value)}>
                            <option value='' hidden>Select staff</option>
                            {
                                departmentStaff.map((staff, key) => (
                                    <option key={key} value={staff.id}>{staff.firstname + ' ' + staff.lastname}</option>
                                ))
                            }
                        </select>
                    </div>
                }
                {
                    selectedStaff &&
                    <div className={`${classes.staffSelection}`}>
                        <div>Report Type:&nbsp;</div>
                        <select className={`${classes.dropdownSelect}`} onChange={(e) => setReportType(e.target.value)}>
                            <option value='' hidden>Select report type</option>
                            <option value='full'>Full</option>
                            <option value='requests'>Requests</option>
                            <option value='complaints'>Complaints</option>
                        </select>
                    </div>
                }
            </div>
            {
                reportList.length > 0 ?
                    <Fragment>
                        <DataPerPage numberOfPages={numberOfPages} setNumberOfPages={setNumberOfPages} />
                        <table className={`${classes.tableParent}`}>
                            <thead className={`${classes.tableHeader}`}>
                                <tr className={`${classes.tableRow}`}>
                                    {reportType === 'full' && <th className={`${classes.tableHead}`} scope="col">Ticket Type</th>}
                                    <th className={`${classes.tableHead}`} scope="col">Subject</th>
                                    <th className={`${classes.tableHead}`} scope="col">Staff Name</th>
                                    <th className={`${classes.tableHead}`} scope="col">Category</th>
                                    <th className={`${classes.tableHead}`} scope="col">Priority</th>
                                    <th className={`${classes.tableHead}`} scope="col">Department</th>
                                </tr>
                            </thead>
                            <tbody className={`${classes.tableBody}`}>
                                {
                                    currentPageData.length > 0 && currentPageData.map((field) => (
                                        <tr className={`${classes.tableField} ${classes.tableRow}`} key={field.id}>
                                            {reportType === 'full' && <td className={`${classes.tableData}`} onClick={() => navigate('')}>{(field.isRequest && 'Request') || (field.isComplaint && 'Complaint')}</td>}
                                            <td className={`${classes.tableData}`} onClick={() => navigate('')}>{field.subject}</td>
                                            <td className={`${classes.tableData}`} onClick={() => navigate('')}>{field.staffName}</td>
                                            <td className={`${classes.tableData}`} onClick={() => navigate('')}>{field.category}</td>
                                            <td className={`${classes.tableData}`} onClick={() => navigate('')}>{field.priority}</td>
                                            <td className={`${classes.tableData}`} onClick={() => navigate('')}>{field.department}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <Sweetpagination
                            currentPageData={setCurrentPageData}
                            dataPerPage={numberOfPages}
                            getData={reportList}
                            navigation={true}
                        />

                    </Fragment>
                    :
                    <div className={`${classes.noData}`}>No reports available</div>
            }
        </Fragment>
    );
};

export default Report;