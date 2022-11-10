import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Marquee from "./Marquee";

function App() {
  return (
    <Routes>
      <Route path="/:text" element={<Marquee />} />
      <Route path="/:duration/:text" element={<Marquee />} />
      <Route path="/:duration/:color/:text" element={<Marquee />} />
      <Route path="/:duration/:color/:bgColor/:text" element={<Marquee />} />
      <Route path="/" element={<Marquee />} />
      <Route path="*" element={<Marquee />} />
    </Routes>
  );
}

export default App;
