import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Faculty from "./pages/Faculty";
import Participant from "./pages/Participant";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Faculty" element={<Faculty />} />
            <Route path="/Participant" element={<Participant />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
