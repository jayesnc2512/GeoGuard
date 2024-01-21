import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  Popup,
  FeatureGroup,
  TileLayer,
  Marker,
  Polygon,
  LayersControl,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconUrl from './marker.png';
import markerIconUrl1 from './marker1.png';

const customMarkerIcon = L.icon({
  iconUrl: markerIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const customMarkerIcon1 = L.icon({
  iconUrl: markerIconUrl1,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const placeColor = { color: "blue" };

const MapWrapper = ({ coordinates }) => {
  const indiaCenter = [20.5937, 78.9629];
  const [Place, setPlace]=useState([]);
  const allMarkersLayerRef = useRef(null);
  const nearbymarkerRef = useRef(null);
  const userMarkerRef = useRef(null);
  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setPlace([[userLatLng[0]-2,userLatLng[1]-2],[userLatLng[0]+2,userLatLng[1]-2],[userLatLng[0]+2,userLatLng[1]+2],[userLatLng[0]-2,userLatLng[1]+2]])

          if (allMarkersLayerRef.current && nearbymarkerRef.current) {
            // Clearing the layers before adding markers
            allMarkersLayerRef.current.clearLayers();
            nearbymarkerRef.current.clearLayers();

            // Iterating through all markers and adding them to the "All Markers" layer
            coordinates.forEach(({ lat, lng,lid,ip }) => {
              const marker = L.marker([lat, lng], { icon: customMarkerIcon }).bindPopup(
                `Camera IP:${ip}, \n Cam LID:${lid}, Latitude: ${lat}, Longitude: ${lng}`
              );
              allMarkersLayerRef.current.addLayer(marker);
              console.log('for nearBy',Math.abs(lat - userLatLng[0]) <= 0.5)
              // Markers within +/- 0.0005 of the user's coordinates 
              if (
                Math.abs(lat - userLatLng[0]) <= 2 &&
                Math.abs(lng - userLatLng[1]) <= 2
              ) {
                // alert("hiii")
                const userMarker = L.marker([lat, lng], { icon: customMarkerIcon }).bindPopup(
                  `Latitude: ${lat}, Longitude: ${lng}`
                );
              
                nearbymarkerRef.current.addLayer(userMarker);
              }
              console.log(nearbymarkerRef.current);
            });
            // Adding a marker for the user's location
            userMarkerRef.current = L.marker(userLatLng, { icon: customMarkerIcon1 }).bindPopup(
              `Your Location: Latitude: ${userLatLng[0]}, Longitude: ${userLatLng[1]}`
            );
            allMarkersLayerRef.current.addLayer(userMarkerRef.current);
          }
        },
        (error) => {
          console.error("Error getting user's location:", error.message);
        }
      );
    };

    getLocation();
  }, [coordinates]); // Include coordinates in the dependency array

  return (
    <div>
      <MapContainer
        center={indiaCenter}
        zoom={5}
        style={{ height: "500px" }}
        scrollWheelZoom={true}
      >
        <LayersControl position="topright" collapsed={false}>
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <LayersControl.Overlay name="All Markers" checked>
            <FeatureGroup ref={allMarkersLayerRef} />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Markers within 5">
            <FeatureGroup ref={nearbymarkerRef} />
            <Polygon pathOptions={placeColor} positions={Place} />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
