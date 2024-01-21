import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  Popup,
  Polygon,
  FeatureGroup,
  TileLayer,
  Marker,
  LayersControl,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconUrl from './marker.png';
import markerIconUrl1 from './marker1.png';

// const ControllingGroup = () => {
//   const map = useMapEvent({
//     layeradd() {
//       let bounds = new L.LatLngBounds();
//       map.eachLayer(function (layer) {
//         if (layer instanceof L.FeatureGroup) {
//           bounds.extend(layer.getBounds());
//         }
//       });

//       if (bounds.isValid()) {
//         map.flyToBounds([bounds]);
//       }
//     },
//   });

//   return null;
// };
const placeColor = { color: "blue" };
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

const MapWrapper = ({ coordinates }) => {
  const indiaCenter = [20.5937, 78.9629];
  //const [Place, setPlace]=useState([]);
  const allMarkersLayerRef = useRef(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = [
            position.coords.latitude,
            position.coords.longitude,
          ];
  //        setPlace([[userLatLng[0]-0.05,userLatLng[1]-0.05],[userLatLng[0]+0.05,userLatLng[1]-0.05],[userLatLng[0]+0.05,userLatLng[1]+0.05],[userLatLng[0]-0.05,userLatLng[1]+0.05]])
          if (allMarkersLayerRef.current) {
            allMarkersLayerRef.current.clearLayers();

            // Adding markers for provided coordinates
            coordinates.forEach(({ lat, lng,lid,ip }) => {
              const marker = L.marker([lat, lng], { icon: customMarkerIcon }).bindPopup(
                `Cam IP: ${ip}, License ID: ${lid} Latitude: ${lat}, Longitude: ${lng}`
              );
              allMarkersLayerRef.current.addLayer(marker);

              // Markers within +/- 0.0005 of the user's coordinates 
              if (
                Math.abs(lat - userLatLng[0]) <= 0.00005 &&
                Math.abs(lng - userLatLng[1]) <= 0.00005
              ) {
                const userMarker = L.marker([lat, lng], { icon: customMarkerIcon }).bindPopup(
                  `Latitude: ${lat}, Longitude: ${lng}`
                );
               // panvelMarkersLayerRef.current.addLayer(userMarker);
              }
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
          {/* <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          /> */}

          <LayersControl.Overlay name="All Markers" checked>
            <FeatureGroup ref={allMarkersLayerRef} />
          </LayersControl.Overlay>
        </LayersControl>
        {/* <LayersControl position="topright" collapsed={false}>
        <LayersControl.Overlay name="Place">
          <FeatureGroup>
            <Polygon pathOptions={placeColor} positions={Place} />
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl> */}

      {/* <ControllingGroup /> */}
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
