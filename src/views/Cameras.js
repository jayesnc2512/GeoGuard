import React from 'react';
import { useState, useEffect }  from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { currentUser } from "firebase/auth"

const Cameras = () => {
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
    },[uid]);

  return (
    <>
          <div className="content">
              <Row>
                  <Col md="12">
                      <Card>
                          <CardHeader>
                              <CardTitle tag="h4">Your Cameras</CardTitle>
                          </CardHeader>
                          <CardBody>
                              <Table responsive>
                                  <thead className="text-primary">
                                      <tr>
                                          <th>Name</th>
                                          <th>Model</th>
                                          <th>Ip-address</th>
                                          <th>latitude</th>
                                          <th>longitude</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {cameras.map((ele)=>
                                      <tr>
                                              <td>{ele.nickName}</td>
                                          <td>{ele.modelNo}</td>
                                              <td>{ele.ipAddress}</td>
                                              <td >{ele.latitude}</td>
                                              <td>{ele.longitude}</td>
                                      </tr>
                                      )}
                                     
                                  </tbody>
                              </Table>
                          </CardBody>
                      </Card>
                  </Col>
              </Row>
              </div>
              </>
  )
}

export default Cameras;