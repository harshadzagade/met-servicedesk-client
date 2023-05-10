import { useState } from 'react';
import './ToggleSwitch.css'

export const ToggleSwitch = ({ toggled, onClick }) => {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <label className="switch">
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span className="slider round"></span>
        </label>
    );
};

export default ToggleSwitch;