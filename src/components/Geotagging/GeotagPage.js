import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import MapWrapper from './leaflet';
// import { useAuthContext } from '../../../hooks/useAuthContext';
import Gmaps from './GooogleMap';
import { db, auth } from '../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { currentUser } from "firebase/auth"


// const GeotagPageWrapper = styled.div`
//   .leaflet-container {
//     margin: 30px auto;
//     height: 500px;
//     z-index: 0;
//     border: 2px solid #333;
//     overflow: hidden;
//   }
//   .geotag {
//     margin:10px;
//     padding:10px;
//   }
// `;

const GeotagPage = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const getUserUid = async () => {
      const user = auth.currentUser; // Use the imported currentUser
      if (user) {
        setUid(user.uid);
      } else {
        console.log('No user is currently signed in.');
      }
    };

    getUserUid();
  }, []);

  useEffect(() => {
    const getLocations = async () => {
      if (!uid) return;

      try {
        const camerasRef = collection(db, 'cameras');
        const q = query(camerasRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        const camerasList = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setCameras(camerasList);
        console.log(cameras)
      } catch (err) {
        console.warn("getCameras failed", err);
      }
    };

    getLocations();
  }, [uid]);

  return (
    <>
      <div className="geotag">
             {/* <div>
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
          </button> 
        </div>*/}

        {/* <MapWrapper coordinates={coordinates} /> */}
        <Gmaps cameras={cameras} />
      </div>
    </>
  );
};

export default GeotagPage;
