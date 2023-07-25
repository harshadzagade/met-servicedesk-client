import { useState } from 'react';
import classes from './ToggleSwitch.module.css'

export const ToggleSwitch = ({ toggled, onClick }) => {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <label className={classes.switch}>
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span className={`${classes.slider} ${classes.round}`}></span>
        </label>
    );
};

export default ToggleSwitch;