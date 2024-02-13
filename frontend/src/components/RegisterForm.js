// RegisterForm.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';


const FormContainer = styled.div`
max-width: 35%;
margin: auto;
margin: 30px auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 5px
`;

const Button = styled.button`
  background-color: #004651;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ToggleIcon = styled.span`
  cursor: pointer;
  margin-left: 8px;
`;

const SignInLink = styled.span`
  margin-top: 10px;
  text-align: center;
  color: #333;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const InputContainer = styled.div`
  position: relative;
  

`;

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactNo, setEmergencyContactNo] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  // console.log('Name:', name);
  // console.log('Contact No:', contactNo);
  // console.log('Email:', email);
  // console.log('Password:', password);
  // console.log('Re-enter Password:', reEnterPassword);
  // console.log('Emergency Contact Name:', emergencyContactName);
  // console.log('Emergency Contact No:', emergencyContactNo);


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Define the API endpoint
      if (password === reEnterPassword) {
        const apiUrl = `${process.env.REACT_APP_API_URL}/auth/signup`;
        // Make the API call
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            contactNo,
            emergencyContactName,
            emergencyContactNo,
            aadhaarNumber,
            email,
            password,
          }),
        });

        // Check if the response is successful (status code 2xx)
        if (response.status === 300) {
          alert("already registered, Please Sign in");
          navigate('/login')
        }
        else if (response.ok) {
          const data = await response.json();
          console.log('Sign-up successful:');
          //console.log(data);
          localStorage.setItem('userData', data);
          await dispatch({ type: 'LOGIN', payload: data });
          navigate('/home');

          // Optionally, you can redirect the user or perform other actions
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.error('Error:', errorData);
          // Handle the error, show an error message, etc.
        }
      } else {
        setError('Re-entered password does not match')
      }

    } catch (error) {
      alert('Error during register:')
      console.error(error);
      // Handle network errors or other exceptions
    }

    // Reset form fields after submission


  };

  return (
    <FormContainer>
      <Title>Register</Title>
      <Form onSubmit={handleRegister}>
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Label htmlFor="contactNo">Contact No:</Label>
        <Input
          type="tel"
          id="contactNo"
          name="contactNo"
          size="10"
          pattern="[0-9]*"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
        />

        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Label htmlFor="aadhaarNumber">Aadhaar Number:</Label>
        <Input
          type="tel"
          id="aadhaarNumber"
          name="aadhaarNumber"
          value={aadhaarNumber}
          pattern="[0-9]*"
          size="12"
          onChange={(e) => setAadhaarNumber(e.target.value)}
          required
        />

        <Label htmlFor="emergencyContactName">Emergency Contact Name:</Label>
        <Input
          type="text"
          id="emergencyContactName"
          name="emergencyContactName"
          value={emergencyContactName}
          onChange={(e) => setEmergencyContactName(e.target.value)}
          required
        />

        <Label htmlFor="emergencyContactNo">Emergency Contact No:</Label>
        <Input
          type="tel"
          id="emergencyContactNo"
          name="emergencyContactNo"
          size="10"
          pattern="[0-9]*"
          value={emergencyContactNo}
          onChange={(e) => setEmergencyContactNo(e.target.value)}
          required
        />


        <InputContainer>
          <Label htmlFor="password">Password:
          </Label>

          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </ToggleIcon>

        </InputContainer>
        <InputContainer>
          <Label htmlFor="reEnterPassword">Re-enter Password:</Label>
          <Input
            type="password"
            id="reEnterPassword"
            name="reEnterPassword"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
            required
          />
        </InputContainer>
        <p style={{ 'color': 'red' }}>{error}</p>
        <Button type="submit">Register</Button>
        <SignInLink>
          <Link to="/signIn">
            Already a user? Click here to Sign In
          </Link>
        </SignInLink>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
