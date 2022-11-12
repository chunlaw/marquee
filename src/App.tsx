import React from "react";
import { Routes, Route } from "react-router-dom";
import Marquee from "./Marquee";
import Panel from "./Panel";

function App() {
  return (
    <Routes>
      <Route path="/:text" element={<Marquee />} />
      <Route path="/:duration/:text" element={<Marquee />} />
      <Route path="/:duration/:color/:text" element={<Marquee />} />
      <Route path="/:duration/:color/:bgColor/:text" element={<Marquee />} />
      <Route path="/" element={<Panel />} />
      <Route path="*" element={<Marquee />} />
    </Routes>
  );
}

export default App;
