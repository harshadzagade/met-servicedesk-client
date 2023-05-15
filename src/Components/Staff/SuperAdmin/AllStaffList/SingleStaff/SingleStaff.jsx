import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SingleStaff.module.css';

const SingleStaff = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/superadmin/${props.id}`);
  };
  return (
    <tr className={`${classes.singleTableRow}`} onClick={handleClick}>
      <th scope="row">{props.name}</th>
      <td>{props.email}</td>
      <td>{props.role}</td>
      <td>{props.department}</td>
    </tr>
  );
};

export default SingleStaff;