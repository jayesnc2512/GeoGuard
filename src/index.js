 
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss?v=1.3.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "./layouts/Admin.js";
import SignIn from "./layouts/SignIn.js";

const LogIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<AdminLayout />} />
      <Route path="/" element={<SignIn/>} />
    </Routes>
  </BrowserRouter>
);
