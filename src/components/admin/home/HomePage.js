import React from 'react';
import CameraPage from './formData';
import styled from "styled-components";

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
    <div><h1>Admin</h1>
    <CameraPage  />
  </div>
  </HomePageWrapper>

);

export default HomePage;
