import React from 'react';
import classes from './DepartmentComplaint.module.css';
import { useNavigate } from 'react-router-dom';
import Sweetpagination from 'sweetpagination';
import { useState } from 'react';
import { iswitch } from 'iswitch';
import axios from 'axios';
import { useEffect } from 'react';

const DepartmentComplaint = ({ numberOfPages }) => {
  const department = localStorage.getItem('department');
  const [allComplaint, setAllComplaint] = useState([]);
  const [currentPageData, setCurrentPageData] = useState(new Array(0).fill());
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await axios.get(`http://localhost:8001/api/complaint/complaints/incoming/${department}`);
        if (list.data.complaints.length === 0) {
          setErrorMessage('No requests available')
        }
        setAllComplaint(list.data.complaints);
      } catch (error) {
        setErrorMessage(`${error.response.data.message}`);
      }
    };
    getList();
  }, [department ,numberOfPages]);
  const navigate = useNavigate();
  return (
    <main>
      <div className={`${classes.requests} `}>
        {
          currentPageData.map((complaint) => (
            <div key={complaint.id} className={`${classes.tikInfo}`} onClick={() => navigate(`/Techcomplaintdetails/${complaint.id}`)} >
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
                <p className={`${classes.tikPri} `} style={{ background: iswitch(complaint.priority, ['High', () => 'red'], ['Medium', () => '#F78D1E'], ['Low', () => 'green']) }}>
                  {complaint.priority}
                </p>
                <p className={`${classes.tikId}`}>
                  {complaint.status}
                </p>
              </div>
            </div>
          ))
        }
        <Sweetpagination
          currentPageData={setCurrentPageData}
          dataPerPage={numberOfPages}
          getData={allComplaint}
          navigation={true}
        />
      </div>
    </main>
  )
}

export default DepartmentComplaint;