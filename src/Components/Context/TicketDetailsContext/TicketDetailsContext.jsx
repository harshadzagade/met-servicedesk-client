import React from "react";

const TicketDetailsContext = React.createContext({
    ticketType: '',
    staffId: null,
    ticketId: null,
    onClickHandler: (ticketType, staffId, ticketId) => { },
});

export default TicketDetailsContext;