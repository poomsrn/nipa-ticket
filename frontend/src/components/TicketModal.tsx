import React, { useEffect, useState } from "react";
import TicketService from "../services/TicketService";
import PopupAlert from "./PopupAlert";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket?: any;
}

const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  ticket,
}) => {
  const [title, setTitle] = useState(ticket?.title || "");
  const [description, setDescription] = useState(ticket?.description || "");
  const [contact, setContact] = useState(ticket?.contactInformation || "");
  const [status, setStatus] = useState(ticket?.status || "");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(ticket?.title || "");
      setDescription(ticket?.description || "");
      setContact(ticket?.contactInformation || "");
      setStatus(ticket?.status || "");
      setErrorMessage("");
      setShowAlert(false);
    }
  }, [isOpen, ticket]);

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

  const closeAlert = async () => {
    setShowAlert(false);
    window.location.reload();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-500 opacity-0 transition-opacity"
            style={{
              opacity: isOpen ? 0.75 : 0,
              transitionDelay: isOpen ? "0ms" : "300ms",
            }}
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="absolute bg-white rounded-md p-4 max-w-md w-full">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={onClose}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-center">
              {" "}
              {/* Add text-center class here */}
              <h2 className="text-2xl font-semibold mb-4">
                {ticket ? "Update Ticket" : "Create Ticket"}
              </h2>
            </div>
            {errorMessage && (
              <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.substring(0, 30))}
                placeholder="Title"
                className="border border-gray-300 rounded-md p-2"
                required
              />
              <div className="flex justify-end">
                <div
                  className="text-sm text-gray-500"
                  style={{ marginTop: "-10px" }}
                >
                  {title.length}/{30} characters
                </div>
              </div>
              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value.substring(0, 500))
                }
                placeholder="Description"
                className="border border-gray-300 rounded-md p-2 h-40"
                required
              ></textarea>
              <div className="flex justify-end">
                <div
                  className="text-sm text-gray-500"
                  style={{ marginTop: "-10px" }}
                >
                  {description.length}/{500} characters
                </div>
              </div>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value.substring(0, 60))}
                placeholder="Contact Information"
                className="border border-gray-300 rounded-md p-2"
                required
              />
              <div className="flex justify-end">
                <div
                  className="text-sm text-gray-500"
                  style={{ marginTop: "-10px" }}
                >
                  {contact.length}/{60} characters
                </div>
              </div>
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
                onClose={closeAlert}
                title="Success"
                message="Ticket has been saved successfully."
                success
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketModal;
