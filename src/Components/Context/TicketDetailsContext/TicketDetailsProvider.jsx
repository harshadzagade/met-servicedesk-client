import React, { useEffect, useState } from 'react';
import TicketDetailsContext from './TicketDetailsContext';

const TicketDetailsProvider = props => {

    const [ticketType, setTicketType] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        if (window.location.pathname !== '/requestdetails/:requestId' || window.location.pathname !== '/complaintdetails/:complaintId') {
            setTicketType('');
            setId(null);
        }
    }, [window.location.href])

    const ticketClickHandler = (type, id) => {
        setTicketType(type);
        setId(id);
    };

    const ticketDetailsContext = {
        ticketType: ticketType,
        id: id,
        onClickHandler: ticketClickHandler
    };
    return (
        <TicketDetailsContext.Provider value={ticketDetailsContext}>{props.children}</TicketDetailsContext.Provider>
    );
};

export default TicketDetailsProvider;