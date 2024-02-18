import React, { useState, useEffect,useRef } from 'react';
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import { db, auth } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { format } from 'date-fns';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import 'semantic-ui-css/semantic.min.css';
const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [uid, setUid] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
  const USER_ID = process.env.REACT_APP_USER_ID;
  useEffect(() => {
    const getUserUid = async () => {
      const user = auth.currentUser;
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
          return { id: doc.id, ...doc.data() };
        });
        setAlerts(alertsList);
      } catch (err) {
        console.warn('getCameras failed', err);
      }
    };

    getLocations();
  }, [uid]);
  const [complaintText, setComplaintText] = useState("");
  const [isComplaintOpen, setIsComplaintOpen] = useState(false); // State for the complaint dialog
  const formattedTime = (timestamp) => {
    const dateObject = new Date(timestamp * 1000); 
    return format(dateObject, 'MMMM dd, yyyy hh:mm a');
  };
  
  const handleComplaintChange = (event) => {
    setComplaintText(event.target.value);
  };

  const handleOpenComplaint = (alert) => {
    setSelectedAlert(alert);
    setIsComplaintOpen(true);
  };

  const handleCloseComplaint = () => {
    setIsComplaintOpen(false);
    setComplaintText(""); 
  };
  const handleClose = () => {
    setSelectedAlert(null);
  };

// const form = useRef();
const formRef = useRef(null); // Ref for the form element

const handleOnSubmit = async (e) => {
  handleClose();
  e.preventDefault();
  try {
    const form = formRef.current; // Access the form element using the ref
    // form.camName.value=selectedAlert.id;
    // form.camLid.value=selectedAlert.camLid;
    // form.date.value=selectedAlert.formattedDate;
    // form.time.value=selectedAlert.formattedTime;
    // form.location.value=`${selectedAlert.camLat},${selectedAlert.camLon}`;
    const result = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
    console.log(result.text);
    Swal.fire({
      icon: 'success',
      title: 'Complaint Sent Successfully',
    });

    // Reset form inputs
    form.reset();
    setComplaintText(""); // Reset the state controlling the input field
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Ooops, something went wrong',
      text: error,
    });
  }
  handleCloseComplaint();
};
  const unReadAlerts = alerts.filter((ale) => !ale.read);
  const readAlerts = alerts.filter((ale) => ale.read);
console.log(selectedAlert);
  const handleMarkAsViewed = async () => {
    if (selectedAlert) {
      try {
        const alertDocRef = doc(db, 'alerts', selectedAlert.id);
        await updateDoc(alertDocRef, { read: true });

        // Update state to move the alert from unReadAlerts to readAlerts
        setAlerts((prevAlerts) =>
          prevAlerts.map((alert) =>
            alert.id === selectedAlert.id ? { ...alert, read: true } : alert
          )
        );

        setSelectedAlert(null); // Close the alert
      } catch (err) {
        console.error('Error marking alert as viewed:', err);
      }
    }
  };

  const handleMarkAsUnviewed = async () => {
    if (selectedAlert) {
      try {
        const alertDocRef = doc(db, 'alerts', selectedAlert.id);
        await updateDoc(alertDocRef, { read: false });

        // Update state to move the alert from readAlerts to unReadAlerts
        setAlerts((prevAlerts) =>
          prevAlerts.map((alert) =>
            alert.id === selectedAlert.id ? { ...alert, read: false } : alert
          )
        );

        setSelectedAlert(null); // Close the alert
      } catch (err) {
        console.error('Error marking alert as unviewed:', err);
      }
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

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
                        {unReadAlerts.map((ele) => (
                          <Alert
                            color="info"
                            key={ele.id}
                            onClick={() => {
                              setSelectedAlert(ele);
                              toggleModal();
                            }}
                          >
                            <span>{ele.message}</span>
                          </Alert>
                        ))}
                        <Modal isOpen={modalOpen} toggle={toggleModal}>
                          <ModalHeader toggle={toggleModal}>
                            Alert Actions
                          </ModalHeader>
                          <ModalBody>
                            {selectedAlert && (
                              <>
                                <div>{selectedAlert.message}</div>

                              </>
                            )}
                          </ModalBody>
                          <ModalFooter>
                            <>
                          <Button color="primary" onClick={handleMarkAsViewed}>
                                  Mark as Viewed
                                </Button>{' '}
                            <Button color="secondary" onClick={toggleModal}>
                              Close
                            </Button>
                            </>
                          </ModalFooter>
                        </Modal>
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
                          <Alert
                            color="info"
                            key={ele.id}
                            onClick={() => {
                              setSelectedAlert(ele);
                              toggleModal();
                            }}
                          >
                            <span>{ele.message}</span>
                          </Alert>
                        ))}
                        <Modal isOpen={modalOpen} toggle={toggleModal}>
                          <ModalHeader toggle={toggleModal}>
                            Alert Actions
                          </ModalHeader>
                          <ModalBody>
                            {selectedAlert && (
                              <>
                                <div>{selectedAlert.message}</div>
                                
                              </>
                            )}
                          </ModalBody>
                          <ModalFooter>
                          <Button color="primary" onClick={handleMarkAsUnviewed}>
                                  Mark as Unviewed
                                </Button>{' '}
                                <Button style={{ backgroundColor: 'rgb(255, 64, 64)', borderColor: 'rgb(255, 64, 64)', color: 'white'  }} onClick={() => handleOpenComplaint(selectedAlert)}>
                                 Lodge a complaint
                                </Button>{' '}    
                            <Button color="secondary" onClick={toggleModal}>
                              Close
                            </Button>
                          </ModalFooter>
                        </Modal>
                         {/* Complaint Dialog */}
                         <Modal isOpen={isComplaintOpen} toggle={handleCloseComplaint}>
                        <ModalHeader toggle={handleCloseComplaint}>Lodge a Complaint</ModalHeader>
                        <ModalBody>
    {selectedAlert && (
      <>
        <div>
          <strong>Camera:</strong> <span>Camera 1</span>
        </div>
        <form ref={formRef} onSubmit={handleOnSubmit}>
          <label>Camera Name: </label>
          <input type="text" name="camName" value="Camera 1" readOnly />
            <br />
          <label>License ID: </label>
          <input type="text" name="camLid" value={selectedAlert.id} readOnly />
          <br />
          <label>Timestamp: </label>
          <input type="text" name="date" value={formattedTime(selectedAlert.created.seconds)}
 readOnly />
          <br />
          <label>Owner-id </label>
          <input type="text" name="time" value={selectedAlert.uid} readOnly />
          <br />
          {/* <label>Location: </label>
          <input
            type="text"
            name="location"
            value={`${selectedAlert.camLat},${selectedAlert.camLon}`}
            readOnly
          />
              <br /> */}
          <label>Additional Info:</label>
          <textarea
            type="text"
            name="message"
            value={complaintText}
            onChange={handleComplaintChange}
            placeholder="Enter additional info..."
            rows={1} 
          />

          <Button type="submit" color="primary">Send Complaint</Button>
        </form>
      </>
    )}
  </ModalBody>

                        <ModalFooter>
                        <Button color="secondary" onClick={handleCloseComplaint}>
                            Close
                        </Button>
                        </ModalFooter>
                    </Modal>

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
  );
};

export default Alerts;
