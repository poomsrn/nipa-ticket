import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const TicketService = {
  getAllTickets: async (sort: string = "", filterOptions: string[] = []) => {
    const response = await axios.get(`${BASE_URL}/ticket`, {
      params: {
        sort,
        filter: filterOptions.join(","),
      },
    });
    return response.data;
  },

  getTicket: async (id: number) => {
    const response = await axios.get(`${BASE_URL}/ticket/${id}`);
    return response.data;
  },

  createTicket: async (ticketData: any) => {
    const request = {
      title: ticketData.title,
      description: ticketData.description,
      contactInformation: ticketData.contact,
    };
    try {
      await axios.post(`${BASE_URL}/ticket/create`, request);
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },

  updateTicket: async (ticketData: any) => {
    const request = {
      id: ticketData.id,
      title: ticketData.title,
      description: ticketData.description,
      contactInformation: ticketData.contact,
      status: ticketData.status,
    };
    try {
      await axios.patch(`${BASE_URL}/ticket/update`, request);
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw error;
    }
  },
};

export default TicketService;
