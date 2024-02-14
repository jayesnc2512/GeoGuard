import React, { useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Container = styled.div`
  max-width: 35%;
  margin: auto;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-top: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
  color: #555;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Icon = styled.span`
  margin-right: 8px;
`;

const ToggleIcon = styled.span`
  cursor: pointer;
  margin-left: 8px;
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

const RegisterLink = styled.span`
  margin-top: 10px;
  text-align: center;
  color: #333;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Define the API endpoint
      const apiUrl = `${process.env.REACT_APP_API_URL}/auth/login/`;

      // Make the API call
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        const data = await response.json();
        console.log("Sign-in successful:", data);
        localStorage.setItem("user@GeoTechies", JSON.stringify(data));
        await dispatch({ type: "LOGIN", payload: data });
        navigate("/home");
      } else {
        const errorData = await response.json();
        console.error("Error signing in:", errorData);
        setError(errorData.message);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      alert("Error during sign-in:");
      console.error(error);
      // Handle network errors or other exceptions
    }

    // Reset form fields after submission
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <Container>
      <Title>Sign In</Title>
      <Form onSubmit={handleSignIn}>
        <Label htmlFor="email">
          <Icon>
            <FaEnvelope />
          </Icon>
          Email:
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Label htmlFor="password">
          <Icon>
            <FaLock />
          </Icon>
          Password:
        </Label>
        <InputContainer>
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
        <p style={{ color: "red" }}>{error}</p>
        <Button type="submit">Sign In</Button>

        <RegisterLink>
          <Link to="/register">New user? Click here to Register</Link>
        </RegisterLink>
      </Form>
    </Container>
  );
};

export default SignInForm;
