import React from "react";

const SubadminContext = React.createContext({
    approval: '',
    setApproval: (approval) => { }
});

export default SubadminContext;