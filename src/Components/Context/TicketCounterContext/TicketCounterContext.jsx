import React from "react";

const TicketCounterContext = React.createContext({
    requestStatusCount: null,
    complaintStatusCount: null,
    setStaffDetails: (id, department) => {}
});

export default TicketCounterContext;