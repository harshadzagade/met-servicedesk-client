import React from "react";

const TicketDetailsContext = React.createContext({
    ticketType: '',
    id: null,
    onClickHandler: (ticketType, id) => { },
});

export default TicketDetailsContext;