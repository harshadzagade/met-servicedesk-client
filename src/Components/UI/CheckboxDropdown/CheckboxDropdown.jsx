import React, { useState, useEffect } from 'react';
import classes from './CheckboxDropdown.module.css';

const CheckboxDropdown = (props) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        props.selectedData(selectedOptions);
    }, [props, selectedOptions]);

    useEffect(() => {
        if (props.defaultValue) {
            setSelectedOptions(props.defaultValue);
        }
    }, [props.defaultValue]);

    const handleOptionChange = (event) => {
        if (!selectedOptions.includes(event.target.value)) {
            setSelectedOptions([...selectedOptions, event.target.value]);
            setSelectedOption('');
        }
    };

    const handleTagRemove = (option) => {
        const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
        setSelectedOptions(updatedOptions);
    };

    return (
        <div className={classes.dropdownWithTags}>
            <div className={classes.dropdownContainer}>
                <select className={classes.dropdownSelect} value={selectedOption} onChange={handleOptionChange}>
                    <option value="">-----Select an option-----</option>
                    {props.data.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className={classes.tagsContainer}>
                {selectedOptions.map((option) => (
                    <div key={option} className={classes.tag}>
                        {option}
                        <button className={classes.tagRemove} onClick={() => handleTagRemove(option)}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxDropdown;
