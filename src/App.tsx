import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Marquee from "./Marquee";
import Panel from "./Panel";
import "./i18n";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("App Name");
  }, [t]);

  return (
    <Routes>
      <Route path="/:text" element={<Marquee />} />
      <Route path="/:duration/:text" element={<Marquee />} />
      <Route path="/:duration/:color/:text" element={<Marquee />} />
      <Route path="/:duration/:color/:bgColor/:text" element={<Marquee />} />
      <Route
        path="/:duration/:color/:bgColor/:font/:text"
        element={<Marquee />}
      />
      <Route path="/" element={<Panel />} />
      <Route path="*" element={<Marquee />} />
    </Routes>
  );
}

export default App;
