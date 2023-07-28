import React from "react";
import TicketForm from "../components/TicketForm";

const TicketFormPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Ticket Form Page</h1>
      <TicketForm />
    </div>
  );
};

export default TicketFormPage;
