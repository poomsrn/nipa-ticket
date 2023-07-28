import React, { useState } from "react";
import TicketService from "../services/TicketService";
import PopupAlert from "./PopupAlert";

interface TicketFormProps {
  ticket?: any;
}

const TicketForm: React.FC<TicketFormProps> = ({ ticket }) => {
  const [title, setTitle] = useState(ticket?.title || "");
  const [description, setDescription] = useState(ticket?.description || "");
  const [contact, setContact] = useState(ticket?.contactInformation || "");
  const [status, setStatus] = useState(ticket?.status || "");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !contact) {
      setErrorMessage("All fields are required");
      return;
    }

    setLoading(true);

    try {
      if (ticket) {
        const { id } = ticket;
        await TicketService.updateTicket({
          id,
          title,
          description,
          contact,
          status,
        });
      } else {
        await TicketService.createTicket({ title, description, contact });
      }
      setLoading(false);
      setShowAlert(true);
    } catch (error) {
      console.error("Error saving ticket:", error);
      setLoading(false);
      setErrorMessage("Error saving ticket. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {ticket ? "Update Ticket" : "Create Ticket"}
      </h2>
      {errorMessage && (
        <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border border-gray-300 rounded-md p-2"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border border-gray-300 rounded-md p-2"
          required
        ></textarea>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Information"
          className="border border-gray-300 rounded-md p-2"
          required
        />
        {ticket && (
          <div>
            <label htmlFor="status" className="block font-medium mb-2">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mt-4"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : ticket
            ? "Update Ticket"
            : "Create Ticket"}
        </button>
        <PopupAlert
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
          title="Success"
          message="Ticket has been saved successfully."
          success
        />
      </form>
    </div>
  );
};

export default TicketForm;
