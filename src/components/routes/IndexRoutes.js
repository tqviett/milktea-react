import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return (
    <Router>
      <Routes>
        {MainRoutes.map((route, index) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}
