// FormPagesStyles.js
import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
`;

export const FormPage = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background-color: #004651;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

export const Paragraph = styled.p`
  margin-bottom: 10px;
`;
