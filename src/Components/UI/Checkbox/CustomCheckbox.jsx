import React from 'react';
import PropTypes from 'prop-types';
import classes from './CustomCheckbox.module.css';

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`${classes.selectedRow}`}
    />
  );
};

CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CustomCheckbox;
