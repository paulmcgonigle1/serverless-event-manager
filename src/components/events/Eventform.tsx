import React, { useState } from "react";

function Eventform() {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventLocation: "",
    ticketPrice: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(eventData);
    const endpoint =
      "https://c5ntv1dcw6.execute-api.eu-west-1.amazonaws.com/dev/event";

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 ">
        <h2 className="text-lg font-semibold">Add Event </h2>
        <div className="mb-4 j">
          <label
            htmlFor="eventName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventData.eventName}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter the event name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventDescription"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Event Description
          </label>
          <textarea
            name="eventDescription"
            value={eventData.eventDescription}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Event Description"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventDate"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventData.eventDate}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Select the event date"
            required
          />
        </div>
        <div>
          <label
            htmlFor="eventName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Event Location
          </label>

          <input
            type="text"
            name="eventLocation"
            value={eventData.eventLocation}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Event Location"
            required
          />
        </div>

        <div>
          <label
            htmlFor="eventName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Event Ticket Price
          </label>

          <input
            type="number"
            name="ticketPrice"
            value={eventData.ticketPrice}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300"
            placeholder="Ticket Price"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default Eventform;
