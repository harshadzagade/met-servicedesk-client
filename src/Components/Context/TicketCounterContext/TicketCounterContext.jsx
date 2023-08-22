import React from "react";

const TicketCounterContext = React.createContext({
    requestStatusCount: null,
    complaintStatusCount: null
});

export default TicketCounterContext;