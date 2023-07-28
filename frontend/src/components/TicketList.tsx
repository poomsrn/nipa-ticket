import React from "react";
import Ticket from "./Ticket";

interface TicketInterface {
  id: number;
  title: string;
  description: string;
  contactInformation: string;
  status: string;
}

interface TicketListProps {
  tickets: TicketInterface[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tickets.map((ticket: TicketInterface) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
