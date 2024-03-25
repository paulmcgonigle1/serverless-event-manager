import React from "react";
import logo from "./logo.svg";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Eventform from "./components/form.tsx/Eventform";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* Define routes for your other pages here */}
          <Route path="/eventform" element={<Eventform />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
