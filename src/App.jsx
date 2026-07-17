import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Universities from "./pages/Universities";
import Programmes from "./pages/Programmes";
import ProgrammeDetails from "./pages/ProgrammeDetails";
import MyResults from "./pages/MyResults";
import AcademicProfile from "./pages/AcademicProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/universities" element={<Universities />} />

        <Route path="/programmes" element={<Programmes />} />

        <Route path="/programmes/:id" element={<ProgrammeDetails />} />

        <Route path="/my-results" element={<MyResults />} />

        <Route path="/profile" element={<AcademicProfile />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;