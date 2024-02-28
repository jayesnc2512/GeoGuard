 
import React from "react";
import { useState, useEffect } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "../variables/charts.js";
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";


function Dashboard() {
  const [alerts, setAlerts] = useState([]);
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
        const camerasRef = collection(db, 'alerts');
        const q = query(camerasRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        const alertsList = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setAlerts(alertsList);
        console.log(alerts);
      } catch (err) {
        console.warn("get alerts failed", err);
      }

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

  const unReadAlerts = alerts.filter((ale) => !ale.read);
  const readAlerts = alerts.filter((ale) => ale.read);







  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Registered Cameras</p>
                      <CardTitle tag="p">{cameras.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Anamoly Detections</p>
                      <CardTitle tag="p">{alerts.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Complaints Raised</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Users Onboard GeoGuard</p>
                      <CardTitle tag="p">1000</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row> */}
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Detection</CardTitle>
                <p className="card-category"></p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <div>
                  <i className="fa fa-circle text-primary" /> Tampering{"  "}
                  <i className="fa fa-circle text-warning" /> Crowd Congestion </div>
                  <div><i className="fa fa-circle text-danger" /> Camera Shutdown{"  "}
                  <i className="fa fa-circle text-gray" /> Vehicle Congestion</div>
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of Complaints Lodged: 12
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Registered User</CardTitle>
                <p className="card-category"></p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Number of Users{" "}
                  <i className="fa fa-circle text-warning" /> Number of Cameras Registered
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
