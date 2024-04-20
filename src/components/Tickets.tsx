import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Tickets() {
  interface Ticket {
    TicketId: string;
    EventId: string;
    Status: string;
    TicketType: string[];
    UserId: string;
  }
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const userId = user?.username; // Assign the actual user ID here

  useEffect(() => {
    const fetchTickets = async () => {
      if (userId) {
        console.log("userId =", userId);
        const endpoint = `https://c5ntv1dcw6.execute-api.eu-west-1.amazonaws.com/dev/contents/${userId}`;

        try {
          const response = await fetch(endpoint);
          const rawData = await response.json();
          console.log("raw Data", rawData);
          const ticketsArray = Array.isArray(rawData)
            ? rawData
            : rawData.tickets;

          if (!Array.isArray(ticketsArray)) {
            console.error("Expected an array but received:", ticketsArray);
            return;
          }
          const transformedData = ticketsArray.map((item): Ticket => {
            const TicketId = item.TicketId?.S;
            const EventId = item.EventId?.S;
            const Status = item.Status?.S;
            const TicketType = item.TicketType?.S;
            const UserId = item.UserId?.S;

            return {
              TicketId,
              EventId,
              Status,
              TicketType: TicketType ? [TicketType] : [],
              UserId,
            };
          });

          setTickets(transformedData);
          console.log("tickets", transformedData);
        } catch (error) {
          console.error("Failed to fetch tickets in Modal: ", error);
        }
      }
    };

    fetchTickets();
  }, [userId]);
  // Remove the extra closing curly brace from here
  return (
    <div className="overflow-y-auto h-full w-full ">
      <h1>Welcome to your tickets page</h1>
      <div className=" mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white max-h-96 overflow-auto">
        <h2 className="text-2xl font-semibold text-center">Your Tickets</h2>
        {/* List tickets here */}

        {tickets.length > 0 ? (
          <ul>
            {tickets.map((ticket) => (
              <li
                key={ticket.TicketId}
                className="m-8 p-4 shadow-xl rounded-lg"
              >
                <h3 className="text-lg font-bold">{ticket.EventId}</h3>
                <p className="text-sm">
                  Event Id:{" "}
                  <span className="font-semibold">{ticket.EventId}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tickets availabble</p>
        )}
      </div>
    </div>
  );
}

export default Tickets;
