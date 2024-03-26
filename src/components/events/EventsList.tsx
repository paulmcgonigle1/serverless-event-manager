import React, { useEffect, useState } from "react";
interface DynamoDBEventItem {
  eventId: { S: string };
  eventName: { S: string };
  eventDescription: { S: string };
  eventDate: { S: string };
  eventLocation: { S: string };
  ticketPrice: { N: string };
}
interface Event {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  ticketPrice: string;
}
const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    // Replace this URL with your API endpoint
    const endpoint =
      "https://c5ntv1dcw6.execute-api.eu-west-1.amazonaws.com/dev/events";

    try {
      const response = await fetch(endpoint);
      const rawData = await response.json();

      const bodyArray = JSON.parse(rawData.body);
      //   console.log("Parsed body array:", bodyArray);

      if (!Array.isArray(bodyArray)) {
        console.error("Expected an array but received:", bodyArray);
        return;
      }

      const transformedData = bodyArray.map((item) => {
        // Added checks to prevent accessing `.S` on undefined
        const eventId = item.EventId?.S;
        const eventName = item.EventName?.S;
        const eventDescription = item.EventDescription?.S;
        const eventDate = item.EventDate?.S;
        const eventLocation = item.EventLocation?.S;
        const ticketPrice = item.TicketPrice?.N;

        return {
          eventId,
          eventName,
          eventDescription,
          eventDate,
          eventLocation,
          ticketPrice,
        };
      });
      setEvents(transformedData);
    } catch (error) {
      console.error("Failed to fetch events: ", error);
    }
  };

  return (
    <div className="events-list">
      <h2 className="text-xl text-center font-semibold my-6">All Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.eventId} className="m-8 p-4 shadow-xl rounded-lg">
              <h3 className="text-lg font-bold">{event.eventName}</h3>
              <p className="text-sm text-gray-700">{event.eventDescription}</p>
              <p className="text-sm">
                Date: <span className="font-semibold">{event.eventDate}</span>
              </p>
              <p className="text-sm">
                Location:{" "}
                <span className="font-semibold">{event.eventLocation}</span>
              </p>
              <p className="text-sm">
                Price:{" "}
                <span className="font-semibold">${event.ticketPrice}</span>
              </p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Buy Tickets
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No events found.</p>
      )}
    </div>
  );
};

export default EventsList;
