import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import firebase from 'firebase/app';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { currentUser } from "firebase/auth";
const { v4: uuidv4 } = require('uuid');
const { MD5 } = require('crypto-js');


const AddCamera = () => {
    const [name, setName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [modelNo, setModelNo] = useState(' ');
    const [brand, setBrand] = useState(' ');
    const [ipAddress, setIpAddress] = useState(' ');
    const [nickName, setNickName] = useState(' ');
    const [camUsername, setCamUsername] = useState(' ');
    const [camPassword, setCamPassword] = useState(' ');
    const [imageLink, setImageLink] = useState(' ');
    const [latitude, setLatitude] = useState(' ');
    const [longitude, setLongitude] = useState(' ');
    const [thisuser, setThisuser] = useState(' ');
    const [lid, setLid] = useState(' ');
    const [is_verified, setIs_verified] = useState(false)
    const Navigate = useNavigate();

    const [uid, setUid] = useState(null);

    useEffect(() => {
        const getUserUid = async () => {
            const user = auth.currentUser;
            // Use the imported currentUser
            setThisuser(user);
            if (user) {
                setUid(user.uid);
                const userDoc = doc(db, 'users', user.uid);
                const userSnapshot = await getDoc(userDoc);
                console.log("getting user data", userSnapshot);
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    console.log(userData.name)
                    setName(userData.name);
                    setEmail(userData.email);
                }
            } else {
                console.log('No user is currently signed in.');
            }
        };

        getUserUid();
    }, []);
    const alertsubmit = () => {
        alert("Camera added successfully!");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (thisuser) {
                const uniqueId = uuidv4();

                // Generate a timestamp
                // Concatenate the unique identifier and timestamp
                const licenseData = `${uniqueId}+${uid}`;
                // Calculate the MD5 hash of the concatenated string
                const licenseId = MD5(licenseData).toString();
                setLid(licenseId);
                console.log("licence Id", licenseId);
                // console.log("modelNo", modelNo);

                const camerasRef = collection(db, 'cameras');
                await addDoc(camerasRef, {
                    uid: uid,
                    modelNo: modelNo,
                    brand: brand,
                    ipAddress: ipAddress,
                    nickName: nickName,
                    lid: licenseId,
                    camUsername: camUsername,
                    camPassword: camPassword,
                    imageLink: imageLink,
                    latitude: latitude,
                    longitude: longitude,

                    createdAt: serverTimestamp()
                });
                console.log('Camera added successfully!');
                // Reset form fields after successful submission
                setModelNo('');
                setBrand('');
                setIpAddress('');
                setNickName('');
                setCamUsername('');
                setCamPassword('');
                setImageLink('');
                setLatitude('');
                setLongitude('');
            } else {
                console.log('Sign in to submit');
                Navigate('/');
            }
        } catch (error) {
            console.error('Error adding camera: ', error);
        }
        alert("Camera added successfully!");
    };



    return (
        <>
            <div className="content">
                <Row>
                    <Col md="8">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Add Camera</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={(e) => handleSubmit(e)}>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <FormGroup>
                                                <label>User ID</label>
                                                <Input
                                                    defaultValue={uid}
                                                    disabled
                                                    placeholder="Company"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-1" md="3">
                                            <FormGroup>
                                                <label>Name</label>
                                                <Input
                                                    defaultValue="Savio"
                                                    disabled
                                                    placeholder="Username"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <FormGroup>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Input defaultValue="geoguard@gmail.com"
                                                    disabled
                                                    placeholder="Username"
                                                    type="email" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>Model Name/No.</label>
                                                <Input
                                                    defaultValue=""
                                                    placeholder=""
                                                    type="text"
                                                    onChange={(e) => setModelNo(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="3">
                                            <FormGroup>
                                                <label>Brand</label>
                                                <Input
                                                    defaultValue=""
                                                    placeholder=""
                                                    type="text"
                                                    onChange={(e) => setBrand(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pr-1" md="5">
                                            <FormGroup>
                                                <label>IP Address</label>
                                                <Input
                                                    defaultValue=""
                                                    placeholder=""
                                                    type="text"
                                                    onChange={(e) => setIpAddress(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>Nick name </label>
                                                <Input
                                                    defaultValue=""
                                                    type="text"
                                                    onChange={(e) => setNickName(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>Cam username</label>
                                                <Input
                                                    defaultValue=""
                                                    placeholder=""
                                                    type="text"
                                                    onChange={(e) => setCamUsername(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <FormGroup>
                                                <label>Cam Password</label>
                                                <Input
                                                    defaultValue=""
                                                    placeholder=""
                                                    type="password"
                                                    onChange={(e) => setCamPassword(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1 google wr">
                                            <FormGroup>
                                                <label>Add a picture of UR defaultValue</label>
                                                <Input
                                                    type='file'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-1 google wr">
                                            <FormGroup>
                                                <label>Uploaded Link</label>
                                                <Input
                                                    defaultValue=""
                                                    placeholder=""
                                                    type="text"
                                                    onChange={(e) => setImageLink(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>Address</label>
                                                <Input
                                                    defaultValue=""
                                                    placeholder="Address where the camera is installed"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row> */}
                                    {/* <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>City</label>
                                                <Input
                                                    defaultValue="Melbourne"
                                                    placeholder="City"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <FormGroup>
                                                <label>Country</label>
                                                <Input
                                                    defaultValue="Australia"
                                                    placeholder="Country"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <FormGroup>
                                                <label>Postal Code</label>
                                                <Input placeholder="ZIP Code" type="number" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row> */}

                                    {/* </Row> */}

                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>latitude</label>
                                                <Input
                                                    defaultValue=""
                                                    placeholder=" "
                                                    type="text"
                                                    onChange={(e) => setLatitude(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label>longitude</label>
                                                <Input
                                                    defaultValue=""
                                                    placeholder=""
                                                    type="text"
                                                    onChange={(e) => setLongitude(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div >
        </>
    )
}

export default AddCamera;