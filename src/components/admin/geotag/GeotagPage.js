import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Gmaps from './gmaps.js';
import Nav from '../../nav/Nav';
import { useAuthContext } from '../../../hooks/useAuthContext.js';

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/camera/getAllCamera/`, {
        method: 'GET',
        headers: {
          'token': userData.token,
        },
      });
      if (response.ok) {
        const camerasList = await response.json();
        //console.log(camerasList.allCamera);
        setCameras(camerasList.allCamera);
        const mappedCoordinates = camerasList.allCamera.map((cam) => ({
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
      {/* <Nav /> */}

      <div className="geotag">
       
        <Gmaps coordinates={coordinates} />
      </div>
    </GeotagPageWrapper>
  );
};

export default GeotagPage;



{/* <div>
  <h2>Add Coordinates</h2>
  <label>
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
  </label>
  {/* <label>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label> */}
  // <button
//     onClick={() =>
//       handleCoordinateChange(parseFloat(newLat), parseFloat(newLng))
//     }
//   >
//     Add Coordinate
//   </button>
// </div> */}