import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from "firebase/auth";
import Icons from '../views/Icons';


const SignInForm = ({ onLogin, onSignIn }) => {
    const [email, setEmail] = useState('');
    const [succesMessage, setSuccessMessage] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({
        userId: '',
        IdToken: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [mode, setMode] = useState('');
    const [error, setError] = useState('');
    // const { dispatch } = useAuthContext();


    const handleGoogleSignIn = async () => {
        await setPersistence(auth, browserSessionPersistence);
        const provider = new GoogleAuthProvider(auth);
        const useCredential = await signInWithPopup(auth, provider);
        console.log("userId from google Login",useCredential.user.uid);
        navigate('/dashboard');

    };


    // const handleSignIn = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // Define the API endpoint
    //         const apiUrl = `${process.env.REACT_APP_API_URL}/auth/login/`;

    //         // Make the API call
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 password,
    //             }),
    //         });

    //         // Check if the response is successful (status code 2xx)
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Sign-in successful:', data);
    //             localStorage.setItem('user@GeoTechies', JSON.stringify(data));
    //             await dispatch({ type: 'LOGIN', payload: data });
    //             navigate('/home');
    //         } else {
    //             const errorData = await response.json();
    //             console.error('Error signing in:', errorData);
    //             setError(errorData.message);
    //             // Handle the error, show an error message, etc.
    //         }
    //     } catch (error) {
    //         alert('Error during sign-in:');
    //         console.error(error);
    //         // Handle network errors or other exceptions
    //     }


    //     // Reset form fields after submission
    //     setEmail('');
    //     setPassword('');
    //     setShowPassword(false);
    // };

    const handleFirebaseSignIn = async (e) => {
        e.preventDefault();
        let useCredential;
        try {
            await setPersistence(auth, browserSessionPersistence);
            useCredential = await signInWithEmailAndPassword(auth, email, password);
            // console.log(useCredential);
            [userData.IdToken, userData.userId] = [useCredential.user.accessToken, useCredential.user.uid];
            console.log("userId:-", userData.userId);
            // await dispatch({type:'LOGIN',payload:userData});
            // userData.userId=useCredential.user.uid;
            // console.log(userData.userId);
            setSuccessMessage("User logged in successfully!");
            navigate('/dashboard');
            //token= useCredential.user.accessToken
            console.log('logged in using firebase');
            setEmail('');
            setPassword('');
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
        // try{
        // const apiUrl = `${process.env.REACT_APP_API_URL}/auth/login/`;
        // const response = await fetch(apiUrl, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     IdToken        
        //   }),
        // });
        // if (response.ok) {
        // const data = await response.json();
        // console.log('Sign-in verified:', useCredential.user.uid);
        // localStorage.setItem('user@GeoTechies', JSON.stringify(data));
        // await dispatch({ type: 'LOGIN', payload: data });
        // navigate('/home');
        // } else {
        // const errorData = await response.json();
        // console.error('Error in Sign-in verification', errorData);
        // setError(errorData.message);
        // Handle the error, show an error message, etc.
        // }
        //   }catch(err){
        //   alert('Error in transfer of token to backend');
        //   console.error(error);
        // }

        

    }

    return (
        <div>
            <Row>
                <Col lg="3" md="4" sm="12"></Col>
                <Col lg="1" md="2" ></Col>

                <Col lg="3" md="4" sm="12">
            <Card className="card-user">
                <div className="image">
                            <img alt="..." src={require("../assets/img/login-bg.png")} />
                            <i className='nc-single-02'></i>
                </div>
                <CardBody>
                    <div className="author">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                                alt="..."
                                className="avatar border-gray"
                                src={require("../assets/img/default-avatar.png")}
                            />
                            <h5 className="title">SIGN IN</h5>
                        </a>
                    </div>
                   <Col className="pl-1" md="12">
                      {/* <FormGroup onSubmit={handleFirebaseSignIn}>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email" />
                                
                                <label htmlFor="password">
                                    Password:
                                </label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />
                                    
                                    
                                </FormGroup> */}
                                <FormGroup>
                                <form onSubmit={handleFirebaseSignIn}>
                                    <label htmlFor="email">
                                        Email:
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="password">
                                        Password:
                                    </label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <div>
                                        <label
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                        <p style={{ 'color': 'red' }}>{error}</p>
                                        <p style={{ 'color': 'green' }}>{succesMessage}</p>
                                        <div className="update ml-auto mr-auto">
                                    <Button
                                        className="btn-round"
                                        color="primary"
                                                type="submit">Sign In</Button>
                                            </div>
                                </form>
                                </FormGroup>
                    </Col>
                </CardBody>
                <CardFooter>
                    <hr />
                    <div className="button-container">
                                <Row>
                                    <div className="update ml-auto mr-auto">
                                        <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
                                        </div>
                        </Row>
                    </div>
                </CardFooter>
                    </Card>
                </Col>
                </Row>
            {/* <h3>Sign In</h3>
            <form onSubmit={handleFirebaseSignIn}>
                <label htmlFor="email">
                    Email:
                </label>
                <inpu
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div>
                    <label
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "show" : "nope"}
                    </span>
                </div>
                <p style={{ 'color': 'red' }}>{error}</p>
                <button type="submit">Sign In</button>

                {/* <div>
                    <link to="/register">
                        New user? Click here to Register
                    </link>
                </div> */}

            {/* </form> */} 
           

        </div>
    );
};

export default SignInForm;
