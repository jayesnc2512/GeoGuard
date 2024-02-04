import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import MapWrapper from './leaflet';
import { useAuthContext } from '../../../hooks/useAuthContext';
import Gmaps from './gmaps';
const GeotagPageWrapper = styled.div`
  .leaflet-container {
    margin: 30px auto;
    height: 500px;
    z-index: 0;
    border: 2px solid #333;
    overflow: hidden;
  }
  .geotag {
    margin:10px;
    padding:10px;
  }
`;

const GeotagPage = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [newLat, setNewLat] = useState('');
  const [newLng, setNewLng] = useState('');
  // const [city, setCity] = useState('');
  const [cameras, setCameras] = useState();
  const { userData } = useAuthContext();


const getLocations = (async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/camera/getCamByUserId/`, {
        method: 'GET',
        headers: {
          'token': userData.token,
          'userId': userData.user._id,
        },
      });
      if (response.ok) {
        const camerasList = await response.json();
        //console.log(camerasList.camByUser);
        setCameras(camerasList.camByUser);
        const mappedCoordinates = camerasList.camByUser.map((cam) => ({
          lat: cam.location.lat,
          lng: cam.location.lon,
          lid: cam.licenseId,
          ip:cam.ip
        }));

        setCoordinates([...coordinates, ...mappedCoordinates]);
      }
    } catch (err) {
      console.warn("getCameras failed", err);
    }
    console.log("coordinates1",coordinates);
  })

  useEffect(() => {
    getLocations();
  }, [userData]);

  const handleCoordinateChange = (lat, lng) => {
    setCoordinates([...coordinates, { lat, lng }]); //city nikala
    setNewLat('');
    setNewLng('');
    // setCity('');
  };

  return (
    <GeotagPageWrapper>
      <div className="geotag">
        <div>
          <h2>View Geotags</h2>
          {/* <label>
            Latitude:
            <input
              type="text"
              value={newLat}
              onChange={(e) => setNewLat(e.target.value)}
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              value={newLng}
              onChange={(e) => setNewLng(e.target.value)}
            />
          </label> */}
          {/* <label>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label> */}
          {/* <button
            onClick={() =>
              handleCoordinateChange(parseFloat(newLat), parseFloat(newLng))
            }
          >
            Add Coordinate
          </button> */}
        </div>

        {/* <MapWrapper coordinates={coordinates} /> */}
        <Gmaps coordinates={coordinates}/>
      </div>
    </GeotagPageWrapper>
  );
};

export default GeotagPage;
