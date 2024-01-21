import React from 'react';
import CameraPage from './formData';
import styled from "styled-components";
import Nav from "../../nav/Nav";

const HomePageWrapper = styled.div`
div{
  // display: flex;
  // flex-direction: column;
  text-align: center;
  padding: 20px;
  margin: 5px;
}`;



const HomePage = () => (
  <HomePageWrapper> 
    {/* <Nav /> */}
    <div><h1>Owner</h1>
    <CameraPage />
  </div>
  </HomePageWrapper>

);

export default HomePage;
