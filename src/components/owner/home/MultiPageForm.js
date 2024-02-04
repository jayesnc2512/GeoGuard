// MultiPageForm.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import FormPages from '../../owner/home/FormPages';
import { FaTimes } from 'react-icons/fa';
import { useAuthContext } from '../../../hooks/useAuthContext';

const StyledFormContainer = styled.div`
  button {
    background-color: #004651;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const StyledModal = styled(Modal)`
&.ReactModal__Overlay {
  display: flex;
  // align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

&.ReactModal__Content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  // align-items: center;
  background-color: white;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  z-index: 2;
  width: 70%;
  max-height: 90%;
  overflow-y: auto;
  border: 2px solid #006400; /* Dark green border color */
}

button {
  background-color: #ff4c4c;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #555; // Adjust the color as needed
}
`;

const MultiPageForm = ({ setCameras }) => {
  const [formData, setFormData] = useState({
    ip: '',
    model: '',
    brand: '',
    nickName: '',
    index: '',
    emContactName: '',
    emPhone: '',
    megapixels: '',
    resolution: '',
    fps: '',
    fov: '',
    lat: '',
    lon: '',
    pic1: '',
    pic2: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [camData, setCamData] = useState();
  const [error, setError] = useState();
  const { userData } = useAuthContext();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormData({
      ip: '',
      model: '',
      brand: '',
      nickName: '',
      index: '',
      emContactName: '',
      emPhone: '',
      megapixels: '',
      resolution: '',
      fps: '',
      fov: '',
      lat: '',
      lon: '',
      pic1: '',
      pic2: '',
    });
    setCurrentPage(1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = (async () => {
    try {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/camera/insertCam/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': userData.token
        },
        body: JSON.stringify({
          ip: formData.ip,
          model: formData.model,
          index: formData.index,
          brand: formData.brand,
          userId: userData.user._id,
          nickName: formData.nickName,
          emContactName: formData.emContactName,
          emPhone: formData.emPhone,
          megapixels: formData.megapixels,
          resolution: formData.resolution,
          fps: formData.fps,
          fov: formData.fov,
          lat: formData.lat,
          lon: formData.lon,
          pic1: formData.pic1,
          pic2: formData.pic2
        }),
      });
      if (response.ok) {
        const data = await response.json();
        //console.log('Camera Inserted', data);
        closeModal();

      } else {
        const errorData = await response.json();
        setError(errorData.message);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      alert('Error during Inserting Camera:');
      console.error(error);
      // Handle network errors or other exceptions
    }
  });

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <StyledFormContainer>
      <button onClick={openModal}>Add Camera</button>
      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Multi-Page Form"
      >
        <FaTimes className="close-icon" onClick={closeModal} />
        <FormPages
          currentPage={currentPage}
          formData={formData}
          handleChange={handleChange}
          nextPage={nextPage}
          prevPage={prevPage}
          setFormData={setFormData}
          submitForm={submitForm}
          error={error}
        />
      </StyledModal>
    </StyledFormContainer>
  );
};

export default MultiPageForm;
