import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Polygon,
} from "@vis.gl/react-google-maps";
import styled from 'styled-components';
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
  .card img{
    width: 50px;
    height: 50px;
  }
`;

const Gmaps = ({ coordinates }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);

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

  const position = { lat: 20.5937, lng: 78.9629 };

  const handleMarkerClick = (index, data) => {
    setSelectedMarker(index);
    setSelectedMarkerData(data);
    setShowMoreInfo(true); // Always show more info on marker click
  };

  const handleViewMoreClick = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  return (
    <GmapsWrap>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div style={{ position: 'relative', height: "75vh", width: "100%" }}>
          <Map zoom={5} center={position} mapId={process.env.REACT_APP_GOOGLE_MAPS_ID}>
            {coordinates &&
              Object.keys(coordinates).map((key, index) => {
                const coord = coordinates[key];
                return (
                  <AdvancedMarker
                    key={index}
                    position={{
                      lat: parseFloat(coord.lat),
                      lng: parseFloat(coord.lng),
                    }}
                    onClick={() => handleMarkerClick(index, coord)}
                  >
                    <Pin
                      background={"blue"}
                      borderColor={"darkblue"}
                      glyphColor={"white"}
                    />
                  </AdvancedMarker>
                );
              })}
            {userLocation && (
              <AdvancedMarker
                position={userLocation}
                onClick={() => handleMarkerClick(null)}
              >
                <Pin
                  background={"green"}
                  borderColor={"green"}
                  glyphColor={"white"}
                />
                {selectedMarker === null && userLocation && (
                    <InfoWindow position={userLocation}>
                      <p>
                        Your Location: Latitude {userLocation.lat}, Longitude{" "}
                        {userLocation.lng}
                      </p>
                    </InfoWindow>
                  )}
              </AdvancedMarker>
            )}
            <Circle
              center={userLocation}
              radius={15000}
              range={1}
            />
          </Map>
          {selectedMarkerData && showMoreInfo && (
            <div className="card">
              <h3>More Information</h3>
              <p><strong>Cam IP: </strong>{selectedMarkerData.ip}</p>
              <p><strong>License ID: </strong>{selectedMarkerData.lid}</p>
              <p><strong>Latitude: </strong>{selectedMarkerData.lat}</p>
              <p><strong>Longitude: </strong>{selectedMarkerData.lng}</p>
              <p><strong>Image: </strong><img src={selectedMarkerData.imgs} alt="cameraimg" /></p>
              <button onClick={handleViewMoreClick}>Hide Info</button>
            </div>
          )}
        </div>
      </APIProvider>
    </GmapsWrap>
  );
};

export default Gmaps;
