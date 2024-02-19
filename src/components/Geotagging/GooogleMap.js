import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import styled from "styled-components";
import { Circle } from "./circle.tsx";

const GmapsWrap = styled.div`
.infowindow {
  padding: 5px;
}
.infowindow img {
  width: 100px;
  height: 100px;
}
.card {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card img {
  width: 50px;
  height: 50px;
}
.control-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
`;

const Gmaps = ({ cameras }) => {
  const [userLocation, setUserLocation] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);
  const [radius, setRadius] = useState(15000); // Default radius
  const [showNearbyCameras, setShowNearbyCameras] = useState(false);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user's location:", error.message);
        }
      );
    };

    getLocation();
  }, []);

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (point1, point2) => {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(point2.latitude - point1.lat);
    const dLon = deg2rad(point2.longitude - point1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(point1.lat)) *
        Math.cos(deg2rad(point2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance * 1000; // Convert to meters
  };

  const handleMarkerClick = (index, data) => {
    setSelectedMarker(index);
    setSelectedMarkerData(data);
    setShowMoreInfo(true); // Always show more info on marker click
  };

  const handleViewMoreClick = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const handleRadiusChange = (event) => {
    setRadius(Number(event.target.value));
  };

  const handleToggleNearbyCameras = () => {
    setShowNearbyCameras(!showNearbyCameras);
  };

  return (
    <GmapsWrap>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div style={{ position: "relative", height: "75vh", width: "100%" }}>
          <Map
            defaultZoom={5}
            defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
            mapId={process.env.REACT_APP_GOOGLE_MAPS_ID}
          >
            {cameras &&
              Object.keys(cameras).map((key, index) => {
                const coord = cameras[key];
                const distance = calculateDistance(userLocation, coord);
                console.log(distance);

                if (!showNearbyCameras || distance <= radius) {
                  return (
                    <AdvancedMarker
                      key={index}
                      position={{
                        lat: parseFloat(coord.latitude) ,
                        lng: parseFloat(coord.longitude),
                      }}
                      onClick={() => handleMarkerClick(index, coord)}
                    >
                      <Pin background={"blue"} borderColor={"darkblue"} glyphColor={"white"} />
                    </AdvancedMarker>
                  );
                }
                return null;
              })}
            {userLocation && (
              <AdvancedMarker
                position={userLocation}
                onClick={() => handleMarkerClick(null)}
              >
                <Pin background={"green"} borderColor={"green"} glyphColor={"white"} />
                {/* {selectedMarker === null && userLocation && (
                  <InfoWindow position={userLocation}>
                    <p>
                      Your Location: Latitude {userLocation.lat}, Longitude{" "}
                      {userLocation.lng}
                    </p>
                  </InfoWindow>
                )} */}
              </AdvancedMarker>
            )}
            {showNearbyCameras && (
              <Circle center={userLocation} radius={radius} />
            )}
            <div className="control-panel">
        <label>Radius:</label>
        <input
          type="range"
          min="15000"
          max="1500000"
          value={radius}
          onChange={handleRadiusChange}
        />
        <button onClick={handleToggleNearbyCameras}>
          {showNearbyCameras ? "Hide Nearby Cameras" : "Show Nearby Cameras"}
        </button>
      </div>
          </Map>
          {selectedMarkerData && showMoreInfo && (
            <div className="card">
              <h3>More Information</h3>
              <p>
                <strong>Cam IP: </strong>
                {selectedMarkerData.ip}
              </p>
              <p>
                <strong>License ID: </strong>
                {selectedMarkerData.lid}
              </p>
              <p>
                <strong>Latitude: </strong>
                {selectedMarkerData.latitude}
              </p>
              <p>
                <strong>Longitude: </strong>
                {selectedMarkerData.longitude}
              </p>
              <p>
                <strong>Image: </strong>
                <img src={selectedMarkerData.imgs} alt="cameraimg" />
              </p>
              <button onClick={handleViewMoreClick}>Hide Info</button>
            </div>
          )}
        </div>
      </APIProvider>
      
    </GmapsWrap>
  );
};

export default Gmaps;