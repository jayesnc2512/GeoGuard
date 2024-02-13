import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #004651;
  }

  li {
    padding: 7px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  h6 {
    color: white;
    margin: 0;
  }

  .selected {
    background-color: #29adb2;
    color: #fff;
  }
`;

const SidebarLinks = ({ active, setActive }) => {
  return (
    <SidebarContainer>
      <ul>
        <Link to="/home">
          <li
            className={active !== 0 ? "nav-column" : "nav-column selected"}
            onClick={() => setActive(0)}
          >
            <h6>CAMERAS</h6>
          </li>
        </Link>
        <Link to="/geotag">
          <li
            className={active !== 1 ? "nav-column" : "nav-column selected"}
            onClick={() => setActive(1)}
          >
            <h6>GEOTAG</h6>
          </li>
        </Link>
        <Link to="/alert">
          <li
            className={active !== 2 ? "nav-column" : "nav-column selected"}
            onClick={() => setActive(2)}
          >
            <h6>ALERT HISTORY</h6>
          </li>
        </Link>
      </ul>
    </SidebarContainer>
  );
};

export default SidebarLinks;
