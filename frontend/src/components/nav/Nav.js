import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Images/logo.png";
import { FaHome } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { FiMail, FiLogOut, FiDownload } from "react-icons/fi";
import { useAuthContext } from "../../hooks/useAuthContext";
import AdminLayout from "../../layouts/Admin";

const AppContainer = styled.div`
  font-family: "Roboto", sans-serif;
  color: white;
  .nav-container {
    display: flex;
    flex-direction: column;
    text-align: left;
    color: white;
  }

  .GeoGuard {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin-bottom: 2px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .GeoGuard img {
    margin-right: 10px;
    width: 80px;
    height: 80px;
    transition: transform 1s ease;
  }

  h1 {
    color: #000000;
    margin: 0;
  }

  .signInButton {
    padding: 3px 10px;
    background-color: #29adb2;
    color: #fff;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  .signInButton:hover {
    background-color: #217e86;
  }
`;

const TopBar = styled.div`
  background-color: #004651;
  padding: 3px;
  text-align: center;
  display: flex;
  color: white;
  flex-wrap: wrap;

  .hackathon {
    display: flex;
    align-items: center;
    text-align: left;
    margin-left: 10px;
    font-size: 18px;
    flex: 1;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #004651;
    margin-left: auto;
    flex-wrap: wrap;
  }

  li {
    margin-right: 10px;
  }

  li:last-child {
    margin-right: 0;
  }

  li:after {
    content: "|";
    font-size: 20px;
  }

  li:last-child:after {
    content: "" !important;
  }

  .icon {
    margin-right: 5px;
    vertical-align: top;
    font-size: 20px;
  }

  .ml-auto {
    margin-left: auto;
  }
`;

const Logo = styled.img`
  margin-right: 10px;
`;

const Nav = () => {
  const [hideSecondComponent, setHideSecondComponent] = useState(false);
  const navigate = useNavigate();
  const [loggedInMode, setLoggedInMode] = useState(null);
  const [active, setActive] = useState(0);
  const { userData, dispatch } = useAuthContext();

  useEffect(() => {
    if (userData !== null) setHideSecondComponent(true);
  }, [userData]);

  const handleLogout = async () => {
    localStorage.removeItem("user@GeoGuard");
    await dispatch({ type: "LOGOUT", payload: null });
    setHideSecondComponent(!hideSecondComponent);
    navigate("/");
  };

  return (
    <AppContainer>
      <TopBar>
        <p className="hackathon">Google Solution Challenge</p>
        <ul>
          <li className="ml-auto">
            <Link to="/">
              <span className="icon">
                <FaHome />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/aboutus">
              <span className="icon">
                <MdInfoOutline />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <span className="icon">
                <FiMail />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/download">
              <span className="icon">
                <FiDownload />
              </span>
            </Link>
          </li>

          <li>
            {!hideSecondComponent ? (
              <Link to="/signIn">
                <span className="signInButton">Sign In</span>
              </Link>
            ) : (
              <div onClick={handleLogout}>
                <span className="icon">
                  <FiLogOut />
                </span>
              </div>
            )}
          </li>
        </ul>
      </TopBar>
      <div className="nav-container">
        <div className="GeoGuard">
          <Logo src={logo} alt="Logo" />
          <h1>GeoGuard</h1>
        </div>
        {hideSecondComponent && (
          <AdminLayout active={active} setActive={setActive} />
        )}
      </div>
    </AppContainer>
  );
};

export default Nav;
