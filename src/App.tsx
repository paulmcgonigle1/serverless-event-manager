import React from "react";
import logo from "./logo.svg";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Eventform from "./components/events/Eventform";
import Navbar from "./components/shared/Navbar";
import Tickets from "./components/Tickets";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* Define routes for your other pages here */}
          <Route path="/eventform" element={<Eventform />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
