import React, { useEffect, useState } from "react";

interface TicketModalProps {
  eventId: string;
  onClose: () => void;
}
interface Ticket {
  TicketId: string;
  EventId: string;
  Status: string;
  TicketType: string[];
}
const TicketModal = ({ eventId, onClose }: TicketModalProps) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [buyAmmount, setBuyAmount] = useState(1);
  useEffect(() => {
    // Fetch tickets for the given eventId
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    // Replace this URL with your API endpoint
    const endpoint = `https://c5ntv1dcw6.execute-api.eu-west-1.amazonaws.com/dev/tickets/${eventId}`;

    try {
      const response = await fetch(endpoint);
      const rawData = await response.json();
      console.log("raw Data", rawData);
      const ticketsArray = Array.isArray(rawData) ? rawData : rawData.tickets;

      if (!Array.isArray(ticketsArray)) {
        console.error("Expected an array but received:", ticketsArray);
        return;
      }
      const transformedData = ticketsArray.map((item): Ticket => {
        // Assuming item structure matches your Ticket type
        // Directly use the item properties without assuming a DynamoDB format
        const TicketId = item.TicketId?.S;
        const EventId = item.EventId?.S;
        const Status = item.Status?.S;
        // Assuming TicketType is a string for simplicity; adjust based on actual structure
        const TicketType = item.TicketType?.S;

        return {
          TicketId,
          EventId,
          Status,
          // Ensure ticketType is treated correctly depending on its structure
          TicketType: TicketType ? [TicketType] : [],
        };
      });

      setTickets(transformedData);
      console.log("tickets", tickets);
    } catch (error) {
      console.error("Failed to fetch tickets in Modal: ", error);
    }
  };
  const availableTicketCount = tickets.filter(
    (ticket) => ticket.Status === "Available"
  ).length;

  const handleBuyTickets = () => {
    console.log(`Buying ${buyAmmount} tickets for event ${eventId}`);
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ">
      <div className="relative top-20 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white max-h-96 overflow-auto">
        <h2 className="text-2xl font-semibold text-center">
          Tickets for Selected Event
        </h2>
        {/* List tickets here */}
        <p className="m-4 font-semibold">
          Available Tickets:{" "}
          <span className="bg-gray-500 rounded-lg text-green-500  my-4 p-3">
            {availableTicketCount}
          </span>{" "}
        </p>
        <input
          type="number"
          min="1"
          max={availableTicketCount}
          value={buyAmmount}
          onChange={(e) => setBuyAmount(Number(e.target.value))}
          className="m-4 border p-1"
        />

        <button
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
          onClick={handleBuyTickets}
        >
          Buy Tickets
        </button>
        <button
          className="px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TicketModal;
