import React, { useState } from "react";
import PopupAlert from "./PopupAlert";
import TicketModal from "./TicketModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faEdit,
  faInfoCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface TicketProps {
  ticket: any;
}

const Ticket: React.FC<TicketProps> = ({ ticket }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "accepted":
        return "bg-green-500";
      case "resolved":
        return "bg-gray-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusDescription = (status: string): string => {
    switch (status) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "resolved":
        return "Resolved";
      case "rejected":
        return "Rejected";
      default:
        return "Unknown Status";
    }
  };

  const handleUpdate = async () => {
    setShowUpdateModal(true);
  };

  const getTruncatedDescription = (description: string, maxLength: number) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 relative">
      {/* Status Indicator */}
      <div
        className={`absolute top-2 right-2 w-4 h-4 rounded-full ${getStatusColor(
          ticket.status
        )}`}
        title={getStatusDescription(ticket.status)}
      />

      <h3 className="text-lg font-semibold mb-2 ">{ticket.title}</h3>
      <p className="text-gray-600 mb-2 flex items-start">
        <FontAwesomeIcon icon={faUser} className="mr-2 mt-1" />
        {getTruncatedDescription(ticket.description, 45)}
      </p>

      <p className="text text-gray-600 mb-2 flex items-start">
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2 mt-1" />
        {getTruncatedDescription(ticket.contactInformation, 45)}
      </p>
      <p className="text-sm text-gray-500 mt-2 flex items-start">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 mt-1" />
        {new Date(ticket.createdAt).toLocaleString("en-US", {
          timeZone: "Asia/Bangkok",
        })}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          <FontAwesomeIcon icon={faEdit} className="mr-3 mt-1" />
          {new Date(ticket.updatedAt).toLocaleString("en-US", {
            timeZone: "Asia/Bangkok",
          })}
        </p>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>
      {/* Ticket Update Modal */}
      <TicketModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        ticket={ticket}
      />

      {/* Popup Alert */}
      <PopupAlert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="Success"
        message="Ticket has been updated successfully."
        success
      />
    </div>
  );
};

export default Ticket;
