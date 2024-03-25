import React from "react";
import Eventform from "./form.tsx/Eventform";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">
        Global Event Manager Application
      </h1>
      <Eventform></Eventform>
    </div>
  );
}

export default Home;
