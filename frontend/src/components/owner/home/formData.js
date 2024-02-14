import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MultiPageForm from "./MultiPageForm";
import { useAuthContext } from "../../../hooks/useAuthContext";

const CameraPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .btn {
    display: flex;
    flex-direction: row;
  }

  .savebtn,
  .closebtn,
  label {
    width: 5rem;
    padding: 4px;
    margin: 4px;
  }

  label {
    padding: 4px;
    margin: 4px;
  }
`;

const CameraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

const CameraCard = styled.div`
  border: 1px solid #121212;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    border-color: #004651;
  }
`;

const AddCameraButton = styled.button`
  background-color: #004651;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent; /* Light blue background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Popup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the left */
  background-color: #f0f8ff; /* AliceBlue color */
  padding: 20px;
  margin: 20px;
  border: 1px solid #87ceeb; /* SkyBlue border */
  border-radius: 8px;
  text-align: left; /* Align text to the left */
  width: 60vw; // Adjust the width as needed
  height: 70vh; // Adjust the height as needed
  overflow: scroll;
  position: relative;

  h2 {
    color: #006400; /* Dark green text color */
    margin-bottom: 15px;
  }

  img {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
    border: 1px solid #87ceeb; /* SkyBlue border for image */
    border-radius: 8px;
  }

  button.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff0000; /* Red color for close button */
    color: white;
    padding: 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #cc0000; /* Darker red on hover */
    }
  }
`;

const DltBtn = styled.button`
  border-color: red;
  background-color: transparent;
  color: red;
  border: none;
  border-radius: 5px;

  &:hover {
    transform: scale(1.05);
    background-color: red;
    color: white;
  }
`;

const CameraPage = () => {
  const [cameras, setCameras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCamera, setNewCamera] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    cameraMp: "",
    cameraViewAngle: 0,
    images: [],
  });
  const [selectedCamera, setSelectedCamera] = useState(null);
  const { userData } = useAuthContext();

  const getCameras = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/camera/getCamByUserId/`,
        {
          method: "GET",
          headers: {
            token: userData.token,
            userId: userData.user._id,
          },
        }
      );
      if (response.ok) {
        const camerasList = await response.json();
        setCameras(camerasList.camByUser);
      }
    } catch (err) {
      console.warn("getCameras failed", err);
    }
  };

  useEffect(() => {
    getCameras();
  }, [userData]);

  const renderValue = (key, value) => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value).map(([nestedKey, nestedValue]) => (
        <p key={`${key}-${nestedKey}`}>
          <strong>{`${nestedKey}:`}</strong> {nestedValue}
        </p>
      ));
    } else {
      return (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      );
    }
  };

  const handleDelete = async (lid, nickName) => {
    const cnf = window.confirm(`Are you sure, you want to delete ${nickName}`);
    if (cnf === true) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/camera/deleteCam/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              licenseid: lid,
              token: userData.token,
            },
          }
        );

        if (response.ok) {
          alert(`Successfully Deleted ${nickName}`);
          getCameras();
        } else {
          const errorData = await response.json();
          alert(`Error deleting ${nickName}: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error during deletion:", error);
        alert("Error during deletion. Please try again.");
      }
    }
  };

  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
  };

  const handleCloseCameraDetailsPopup = () => {
    setSelectedCamera(null);
  };

  return (
    <CameraPageWrapper className="camera-page">
      <MultiPageForm setCameras={setCameras} />
      <CameraGrid>
        {cameras.map((camera, index) => (
          <CameraCard key={index} onClick={() => handleCameraClick(camera)}>
            <h3>{camera.brand}</h3>
            <p>{camera.location.lat}</p>
            <p>{camera.location.lon}</p>
            <h3>{camera.ip}</h3>
            <DltBtn
              onClick={() => handleDelete(camera.licenseId, camera.nickName)}
            >
              Delete
            </DltBtn>
          </CameraCard>
        ))}
      </CameraGrid>
      {selectedCamera && (
        <PopupOverlay onClick={handleCloseCameraDetailsPopup}>
          <Popup>
            <button
              className="close-button"
              onClick={handleCloseCameraDetailsPopup}
            >
              Close
            </button>
            <h2>Camera Details</h2>
            {Object.entries(selectedCamera).map(([key, value]) =>
              renderValue(key, value)
            )}
            <img src={selectedCamera.pictures.pic1} alt="picture" />
          </Popup>
        </PopupOverlay>
      )}
    </CameraPageWrapper>
  );
};

export default CameraPage;
