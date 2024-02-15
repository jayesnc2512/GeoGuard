import React from 'react';
import { useState,useEffect } from 'react';
import {
    UncontrolledAlert,
    Alert,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
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
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Alerts</CardTitle>

                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="6">
                                        <Card className="card-plain">
                                            <CardHeader>
                                                <CardTitle tag="h5">Alert ({unReadAlerts.length})</CardTitle>
                                            </CardHeader>
                                            <CardBody>
                                                {unReadAlerts.map((ele) =>  (
                                                    <Alert color="info">
                                                        <span>{ele.message}</span>
                                                    </Alert>
                                                )
                                                )}
                                                
                                                {/* <UncontrolledAlert color="info" fade={false}>
                                                    <span>This is a notification with close button.</span>
                                                </UncontrolledAlert>
                                                <UncontrolledAlert
                                                    className="alert-with-icon"
                                                    color="info"
                                                    fade={false}
                                                >
                                                    <span
                                                        data-notify="icon"
                                                        className="nc-icon nc-bell-55"
                                                    />
                                                    <span data-notify="message">
                                                        This is a notification with close button and icon.
                                                    </span>
                                                </UncontrolledAlert>
                                                <UncontrolledAlert
                                                    className="alert-with-icon"
                                                    color="info"
                                                    fade={false}
                                                >
                                                    <span
                                                        data-notify="icon"
                                                        className="nc-icon nc-chart-pie-36"
                                                    />
                                                    <span data-notify="message">
                                                        This is a notification with close button and icon
                                                        and have many lines. You can see that the icon and
                                                        the close button are always vertically aligned. This
                                                        is a beautiful notification. So you don't have to
                                                        worry about the style.
                                                    </span>
                                                </UncontrolledAlert> */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="6">
                                        <Card className="card-plain">
                                            <CardHeader>
                                                <CardTitle tag="h5">Viewed Alerts</CardTitle>
                                            </CardHeader>
                                            <CardBody>
                                                {readAlerts.map((ele) => (
                                                    <Alert color="info">
                                                        <span>{ele.message}</span>
                                                    </Alert>
                                                )
                                                )}
                                                {/* <UncontrolledAlert color="primary" fade={false}>
                                                    <span>
                                                        <b>Primary - </b>
                                                        This is a regular notification made with
                                                        color="primary"
                                                    </span>
                                                </UncontrolledAlert>
                                                <UncontrolledAlert color="info" fade={false}>
                                                    <span>
                                                        <b>Info - </b>
                                                        This is a regular notification made with
                                                        color="info"
                                                    </span>
                                                </UncontrolledAlert>
                                                <UncontrolledAlert color="success" fade={false}>
                                                    <span>
                                                        <b>Success - </b>
                                                        This is a regular notification made with
                                                        color="success"
                                                    </span>
                                                </UncontrolledAlert>
                                                <UncontrolledAlert color="warning" fade={false}>
                                                    <span>
                                                        <b>Warning - </b>
                                                        This is a regular notification made with
                                                        color="warning"
                                                    </span>
                                                </UncontrolledAlert>
                                                <UncontrolledAlert color="danger" fade={false}>
                                                    <span>
                                                        <b>Danger - </b>
                                                        This is a regular notification made with
                                                        color="danger"
                                                    </span>
                                                </UncontrolledAlert> */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Alerts