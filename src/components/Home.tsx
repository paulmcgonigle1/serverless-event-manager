import React from "react";
import Eventform from "./events/Eventform";
import EventsList from "./events/EventsList";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Events page</h1>
      <div className="flex justify-center">
        <div className="flex-1 min-w-0 ">
          <Eventform></Eventform>
        </div>
        <div className="flex-1 min-w-0">
          <EventsList></EventsList>
        </div>
      </div>
    </div>
  );
}

export default Home;
