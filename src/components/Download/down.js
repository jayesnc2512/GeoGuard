// DownloadPage.js
// DownloadPage.js
import React from 'react';
import styled from 'styled-components';

// Define some color variables
const green1 = '#66ff66';
const green2 = '#33cc33';
const green3 = '#009900';

// Styled components
const Wrapper = styled.div`
  margin: auto;
  margin-top: 20px;
  text-align: center;
  padding: 20px;
  background-color: rgb(206, 206, 206);
  border: 3px solid white;
  max-width: 800px;
  box-shadow: 0 0 10px black;
  border-radius: 20px;
  transition: background-color 0.5s;

  
`;

const DownloadButton = styled.button`
  display: block;
  margin: 10px auto;
  padding: 15px 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background:linear-gradient(to right top, #004651, #20606b, #397a86, #5296a1, #6bb3be);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const MarkdownContent = styled.div`
text-align: left;
margin-top: 20px;

h2 {
  color: ${green2};
}

h4 {
  margin-top: 20px;
  color: ${green3};
}

p {
  margin-bottom: 10px;
  
}

img {
  display: block;
  margin: 0 auto; /* Center the image */
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

hr {
  border: none;
  height: 2px;
  background-color: black;
  margin: 20px 0;
}

h4, p {
  display: inline-block;
  margin: 0; /* To remove default margin */
}
`;

const DownloadPage = () => {
  const handleDownload = () => {
    const url = 'https://drive.google.com/file/d/1bhC83E62RJxEngGb_lDrZBTgfV2bvsmO/view?usp=sharing';
    window.open(url, '_blank');
  };

  return (
    <Wrapper>
      <h2>Steps to Download & Run the GeoGuard Camera Detection Application</h2>
      <DownloadButton onClick={handleDownload}>Download Now</DownloadButton>
      <MarkdownContent>
        <h4>Step 1:</h4>
        <p>  Download the zip folder from the above link.</p>
        <hr />

        <h4>Step 2:</h4>
        <p>  Double click on the .exe file to run the application.</p>
        <hr />

        <h4>Step 3:</h4>
        <p>  Enter the registered email and password in the application.</p>
        <img src="./images/1.png" alt="Step 3" />
        <hr />

        <h4>Step 4:</h4>
        <p>  If registered successfully, you will see the following screen.</p>
        <img src="./images/2.png" alt="Step 4" />
        <hr />

        <h4>Step 5:</h4>
        <p>  It shows all the registered cameras in the application.</p>
        <img src="./images/3.JPG" alt="Step 5" />
        <hr />

        <h4>Step 6:</h4>
        <p>  After that, it will prompt to install the required dependencies.</p>
        <img src="./images/4.JPG" alt="Step 6" />
        <hr />

        <h4>Step 7:</h4>
        <p>  All the registered cameras can be activated by clicking on the specific camera option.</p>
        <img src="./images/5.JPG" alt="Step 7" />
      </MarkdownContent>
    </Wrapper>
  );
};

export default DownloadPage;
