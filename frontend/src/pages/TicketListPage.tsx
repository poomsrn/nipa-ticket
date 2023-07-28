import React, { useEffect, useState } from "react";
import TicketList from "../components/TicketList";
import TicketModal from "../components/TicketModal";
import "../css/ticketListStyles.css";
import TicketService from "../services/TicketService";

const TicketListPage: React.FC = () => {
  const [tickets, setTickets] = useState<any[] | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await TicketService.getAllTickets(
          sortOption,
          filterOptions
        );
        setTickets(response);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setTickets([]);
      }
    };
    fetchTickets();
  }, [sortOption, filterOptions]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setFilterOptions((prevOptions) => [...prevOptions, value]);
    } else {
      setFilterOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
    }
  };

  const handleCreateButtonClick = () => {
    setCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="mr-4">
          <label className="mr-2">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="latestUpdated">Latest Updated</option>
            <option value="oldestUpdated">Oldest Updated</option>
            <option value="latestCreated">Latest Created</option>
            <option value="oldestCreated">Oldest Created</option>
            <option value="status">Status</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="checkbox-label relative flex items-center mr-4">
            <span
              className={`${
                filterOptions.includes("pending")
                  ? "bg-yellow-500"
                  : "bg-gray-300"
              } w-4 h-4 rounded-full mr-2`}
              aria-hidden="true"
            />
            Pending
            <input
              type="checkbox"
              value="pending"
              checked={filterOptions.includes("pending")}
              onChange={handleFilterChange}
              className="form-checkbox ml-2"
            />
          </label>
          <label className="checkbox-label relative flex items-center mr-4">
            <span
              className={`${
                filterOptions.includes("accepted")
                  ? "bg-green-500"
                  : "bg-gray-300"
              } w-4 h-4 rounded-full mr-2`}
              aria-hidden="true"
            />
            Accepted
            <input
              type="checkbox"
              value="accepted"
              checked={filterOptions.includes("accepted")}
              onChange={handleFilterChange}
              className="form-checkbox ml-2"
            />
          </label>
          <label className="checkbox-label relative flex items-center mr-4">
            <span
              className={`${
                filterOptions.includes("resolved")
                  ? "bg-gray-500"
                  : "bg-gray-300"
              } w-4 h-4 rounded-full mr-2`}
              aria-hidden="true"
            />
            Resolved
            <input
              type="checkbox"
              value="resolved"
              checked={filterOptions.includes("resolved")}
              onChange={handleFilterChange}
              className="form-checkbox ml-2"
            />
          </label>
          <label className="checkbox-label relative flex items-center">
            <span
              className={`${
                filterOptions.includes("rejected")
                  ? "bg-red-500"
                  : "bg-gray-300"
              } w-4 h-4 rounded-full mr-2`}
              aria-hidden="true"
            />
            Rejected
            <input
              type="checkbox"
              value="rejected"
              checked={filterOptions.includes("rejected")}
              onChange={handleFilterChange}
              className="form-checkbox ml-2"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCreateButtonClick}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
          >
            +
          </button>
        </div>
      </div>
      <hr className="my-8" />
      {tickets === null ? (
        <p>Loading...</p>
      ) : tickets?.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <TicketList tickets={tickets} />
      )}
      <TicketModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TicketListPage;
