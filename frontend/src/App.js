// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Navigate } from 'react-router-dom';

import OHomePage from "./components/owner/home/HomePage";
import OGeotagPage from "./components/owner/geotag/GeotagPage";
import OAlertPage from "./components/owner/alert/AlertPage";
import AHomePage from "./components/admin/home/HomePage";
import AGeotagPage from "./components/admin/geotag/GeotagPage";
import AAlertPage from "./components/admin/alert/AlertPage";
import Gmaps from "./components/owner/geotag/gmaps";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss?v=1.3.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "../src/layouts/Admin.js";

// const AppContainer = styled.div`
//   max-width: 800px;
//   margin: 0 auto;

import GeotagPage from "./components/owner/geotag/GeotagPage";
import AlertPage from "./components/owner/alert/AlertPage";
import Nav from "./components/nav/Nav";
import SignInPage from "./components/SignInPage";
import RegisterForm from "./components/RegisterForm";
import LandingPage from "./components/Landing Page/LandingPage";
import { useAuthContext } from "./hooks/useAuthContext";
import Contactus from "./components/Contactus";
import Aboutus from "./components/Aboutus";
import DownloadPage from "./components/Download/down";

// const Link = styled(Link)`
//   margin-right: 20px;
//   text-decoration: none;
//   color: #333;
//   font-weight: bold;
// `;

const App = () => {
  const [hideSecondComponent, setHideSecondComponent] = useState(false);
  const { userData } = useAuthContext();
  const [loginMode, setLoginMode] = useState();

  const handleLoginMode = () => {
    if (!userData) setLoginMode(0);
    else if (userData.user.isAdmin === false) setLoginMode(1);
    else if (userData.user.isAdmin === true) setLoginMode(2);
  };

  useEffect(() => {
    handleLoginMode();
  }, [userData]);

  return (
    <Router>
      <Nav />
      <Routes>
        {/* <Route
            path="/login"
            element={
              !loggedInMode ? <Login onLogin={handleLogin} /> : null
            }
          /> */}
        <Route
          path="/home"
          element={
            loginMode === 0 ? (
              <LandingPage />
            ) : loginMode === 2 ? (
              <AHomePage />
            ) : (
              <OHomePage />
            )
          }
        />
        {/* <Route path="/adminHome" element={<AHomePage/>}/> */}

        <Route
          path="/geotag"
          element={
            loginMode === 0 ? (
              <LandingPage />
            ) : loginMode === 2 ? (
              <AGeotagPage />
            ) : (
              <OGeotagPage />
            )
          }
        />
        {/* <Route path="/gmaps" element={loginMode === 0 ? <LandingPage /> : (loginMode === 2 ? <Gmaps /> : <Gmaps />)} /> */}

        <Route
          path="/alert"
          element={
            loginMode === 0 ? (
              <LandingPage />
            ) : loginMode === 2 ? (
              <AAlertPage />
            ) : (
              <OAlertPage />
            )
          }
        />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
