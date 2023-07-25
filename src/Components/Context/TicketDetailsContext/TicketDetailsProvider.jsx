import React, { useState } from 'react';
import TicketDetailsContext from './TicketDetailsContext';

const TicketDetailsProvider = props => {
    const [ticketType, setTicketType] = useState('');
    const [staffId, setStaffId] = useState(null);
    const [ticketId, setTicketId] = useState(null);

    const ticketClickHandler = (type, staffId, ticketId) => {
        setTicketType(type);
        setStaffId(staffId);
        setTicketId(ticketId);
    };

    const ticketDetailsContext = {
        ticketType: ticketType,
        staffId: staffId,
        ticketId: ticketId,
        onClickHandler: ticketClickHandler
    };
    return (
        <TicketDetailsContext.Provider value={ticketDetailsContext}>{props.children}</TicketDetailsContext.Provider>
    );
};

export default TicketDetailsProvider;