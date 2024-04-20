import React from "react";
import Eventform from "./events/Eventform";
import EventsList from "./events/EventsList";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Events page</h1>
      <div className="flex justify-center">
        <div
          className={`flex-1 min-w-0 ${
            user ? "" : "opacity-50 cursor-not-allowed"
          }`}
        >
          {user ? (
            <Eventform />
          ) : (
            <div className="text-center">Log in to create events</div>
          )}
        </div>
        <div
          className={`flex-1 min-w-0 ${
            user ? "" : "opacity-50 cursor-not-allowed"
          }`}
        >
          {user ? (
            <EventsList />
          ) : (
            <div className="text-center">Log in to view events</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
