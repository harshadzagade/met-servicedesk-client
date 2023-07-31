import { useState } from "react";
import SubadminContext from "./SubadminContext";

const SubadminProvider = props => {
    const [approval, setApproval] = useState('');

    const setApprovalHandler = value => {
        sessionStorage.setItem('approval', approval);
        setApproval(value);
    };

    const subadminContext = {
        approval: approval || sessionStorage.getItem('approval'),
        setApproval: setApprovalHandler
    };
    return (
        <SubadminContext.Provider value={subadminContext}>{props.children}</SubadminContext.Provider>
    );
};

export default SubadminProvider;