
import React from "react";
import { useEffect } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import GeotagPage from "../components/Geotagging/GeotagPage";
import GoogleMap from "../components/Geotagging/GooogleMap";

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

const MapWrapper = () => {
  // const mapRef = React.useRef(null);  
 

  return (
    <>
      <div style={{ height: `100%` }} >
          {/* <GeotagPage/> */}
      </div>
    </>
  );
};

function Map() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12" >
            <Card>
              <CardHeader>Google Maps</CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative" }}
                >
          <GeotagPage/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
