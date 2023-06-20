import React, { useEffect, useState } from 'react';
import classes from './OwnComplaint.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { iswitch } from 'iswitch';
import SweetPagination from 'sweetpagination';
import AdminContext from '../../../Context/AdminContext/AdminContext';
import { useContext } from 'react';

const OwnComplaint = () =>  {
  const id = localStorage.getItem('id');
  const adminCtx = useContext(AdminContext);
    const [allComplaint, setAllComplaint] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
      const [errorMessage, setErrorMessage] = useState('');
  
  
 useEffect(() => {
    const getList = async () => {
        try {
            const list = await axios.get(`http://localhost:8001/api/complaint/owncomplaints/${id}`);
            if (list.data.complaints.length === 0) {
                setErrorMessage('No complaints available')
            }
            setAllComplaint(list.data.complaints);
        } catch (error) {
            setErrorMessage(`${error.response.data.message}`);
        }
    };
    if (adminCtx.department) {
        getList();
    } else {
        setErrorMessage('Please select department')
    }
}, [adminCtx.department]);
  
    const navigate = useNavigate();
    return (
      <main>
        


        <div className={`${classes.complaint} `}>
          {
            currentPageData.map((complaint) => (
              <div key={complaint.id} className={`${classes.tikInfo}`} onClick={() => navigate(`/complaintdetails/${complaint.id}`)} >
                <div className={`${classes.tikHead}`}>
                
                  <h3 className={`${classes.tikTitle}`}>
                    {complaint.subject}
                  </h3>

                
                  <span className={`${classes.date}`}>
                    {complaint.createdAt}
                  </span>
                </div>
                <div className={`${classes.tikMsg}`}>
                  <p>
                  <div dangerouslySetInnerHTML={{ __html: complaint.description }}></div>
                  </p>
                </div>
                <div className={`${classes.tikOther}`}>
                <p className={`${classes.tikId}`}>
                    #{complaint.id}
                  </p>
                  <p className={`${classes.tikId}`}>
                    #{complaint.status}
                  </p>

                  <p className={`${classes.tikPri} `} style={{ background: iswitch(complaint.priority, ['High', () => 'red'], ['Medium', () => '#F78D1E'], ['Low', () => 'green']) }}>
                    {complaint.priority}
                  </p>
                </div>
              </div>
            ))
          }
          <SweetPagination
            currentPageData={setCurrentPageData}
            dataPerPage={numberOfPages}
            getData={allComplaint}
            navigation={true}
          />
        </div>
      </main>
  )
  }
  
export default OwnComplaint;