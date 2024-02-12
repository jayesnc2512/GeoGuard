// MultiPageForm.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FormPages from './FormPages';

const MultiPageForm = ({ setCameras }) => {
  const [formData, setFormData] = useState({
    ip: '',
    model: '',
    brand: '',
    nickName: '',
    emergencyContact_name: '',
    emergencyPhone: '',
    megapixels: '',
    resolution: '',
    fps: '',
    fov: '',
    lat: '',
    lon: '',
    pic1: [],
    pic2: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      emergencyContact_name: '',
      emergencyPhone: '',
      megapixels: '',
      resolution: '',
      fps: '',
      fov: '',
      lat: '',
      lon: '',
      pic1: [],
      pic2: [],
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

  const submitForm = () => {
      // Store the current form data in local storage
      const storedCameras = localStorage.getItem('cameras');
      const camerasArray = storedCameras ? JSON.parse(storedCameras) : [];
      camerasArray.push(formData);
      // localStorage.setItem('cameras', JSON.stringify(camerasArray));
  
      // Update the state in CameraPage component
      setCameras(camerasArray);
      closeModal();
  };

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <div>
      <button onClick={openModal}>Open Form</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Multi-Page Form"
      >
        <button onClick={closeModal}>Close</button>
        <FormPages
          currentPage={currentPage}
          formData={formData}
          handleChange={handleChange}
          nextPage={nextPage}
          prevPage={prevPage}
          setFormData={setFormData}
          submitForm={submitForm}
        />
      </Modal>
    </div>
  );
};

export default MultiPageForm;
