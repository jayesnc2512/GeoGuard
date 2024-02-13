// FPStyles.js
import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

export const FormPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

export const Column = styled.div`
  width: 48%;
`;

export const Heading = styled.h2`
  text-align: left;
  margin-bottom: 20px;
  border-bottom: 2px solid #004651;
  padding-bottom: 10px;
`;

export const Label = styled.label`
  margin: 10px 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

export const Button = styled.button`
background-color: #2ecc71;
  color: white;
  
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

export const Paragraph = styled.p`
  margin: 10px 0;
`;
