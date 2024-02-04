import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  // Import Polygon from react-google-maps
  Polygon,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Marker } from "@googlemaps/markerclusterer";
import { Circle,GoogleMap } from "@react-google-maps/api"; // Import Circle from react-google-maps/api

const Gmaps = ({ coordinates }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
  };

  return (
    <APIProvider apiKey={REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "75vh", width: "100%" }}>
        <Map zoom={5} center={position} mapId={REACT_APP_GOOGLE_MAPS_ID}>
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
                  onClick={() => handleMarkerClick(index)}
                >
                  <Pin
                    background={"blue"}
                    borderColor={"darkblue"}
                    glyphColor={"white"}
                  />
                  {selectedMarker === index && (
                    <InfoWindow
                      position={{
                        lat: parseFloat(coord.lat),
                        lng: parseFloat(coord.lng),
                      }}
                    >
                      <p>
                        Cam IP: {coord.ip}, License ID: {coord.lid} Latitude:{" "}
                        {coord.lat}, Longitude: {coord.lng}
                      </p>
                    </InfoWindow>
                  )}
                </AdvancedMarker>
              );
            })}

          {userLocation && (
            <>
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
              {/* Use Polygon from react-google-maps */}

            </>
          )}
          <Circle
                center={{ lat: 20.5937, lng: 78.9629 }}
                radius={767.7819845667905}
                options={{
                  fillColor: "rgba(0, 255, 0, 0.2)",
                  strokeColor: "green",
                  strokeWeight: 10,
                }}
              />
        </Map>
      </div>
    </APIProvider>
  );
};

export default Gmaps;
