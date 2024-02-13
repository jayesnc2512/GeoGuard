// FormPages.js
import React from 'react';
import {
  FormContainer,
  FormPage,
  Label,
  Input,
  Button,
  Paragraph,
} from './FPStyles';
import UploadWidget from './UploadWidget';

const FormPages = ({
  currentPage,
  formData,
  handleChange,
  nextPage,
  setFormData,
  prevPage,
  submitForm,
}) => {
  return (
    <FormContainer>
      {currentPage === 1 && (
        <FormPage>
          <h2>Camera Specifications</h2>
          <Label>Ip Address</Label>
          <Input
            type="text"
            name="ip"
            value={formData.ip}
            onChange={handleChange}
            required
          />
          <Label>Nickname</Label>
          <Input
            type="text"
            name="nickName"
            value={formData.nickName}
            onChange={handleChange}
          />
          <Label>Model</Label>
          <Input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
          <Label>Brand</Label>
          <Input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
          <Label>Megapixels</Label>
          <Input
            type="text"
            name="megapixels"
            value={formData.megapixels}
            onChange={handleChange}
          />
          <Label>Resolution</Label>
          <Input
            type="text"
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
          />
          <Label>FPS</Label>
          <Input
            type="text"
            name="fps"
            value={formData.fps}
            onChange={handleChange}
          />
          <Label>FOV</Label>
          <Input
            type="text"
            name="fov"
            value={formData.fov}
            onChange={handleChange}
          />
          <Button onClick={nextPage}>Next</Button>
        </FormPage>
      )}
      {currentPage === 2 && (
        <FormPage>
          <h2>Add Camera Location Details</h2>
          <Label>Latitude</Label>
          <Input
            type="text"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
          />
          <Label>Longitude</Label>
          <Input
            type="text"
            name="lon"
            value={formData.lon}
            onChange={handleChange}
            required
          />
          <Label>Upload Image</Label>
          <Input
            type="file"
            accept="image/*"
            capture="camera"
            onChange={handleChange}
          />
          <Label>Upload Image 2</Label>
          <Input
            type="file"
            accept="image/*"
            capture="camera"
            onChange={handleChange}
            required
          />
          <UploadWidget/>
          <Button onClick={prevPage}>Previous</Button>
          <Button onClick={nextPage}>Next</Button>
        </FormPage>
      )}
      {currentPage === 3 && (
        <FormPage>
          <h2>Add Emergency Contact Details</h2>
          <Label>Contact Name</Label>
          <Input
            type="text"
            name="emergencyContact_name"
            value={formData.emergencyContact_name}
            onChange={handleChange}
          />
          <Label>Contact No.</Label>
          <Input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleChange}
          />
          <Button onClick={prevPage}>Previous</Button>
          <Button onClick={nextPage}>Next</Button>
        </FormPage>
      )}
      {currentPage === 4 && (
        <FormPage>
          <Paragraph>Review your information:</Paragraph>
          <Paragraph>Ip Address: {formData.ip}</Paragraph>
          <Paragraph>Nickname: {formData.nickName}</Paragraph>
          <Paragraph>Model: {formData.model}</Paragraph>
          <Paragraph>Brand: {formData.brand}</Paragraph>
          <Paragraph>Megapixels: {formData.megapixels}</Paragraph>
          <Paragraph>Resolution: {formData.resolution}</Paragraph>
          <Paragraph>FPS: {formData.fps}</Paragraph>
          <Paragraph>FOV: {formData.fov}</Paragraph>
          <Paragraph>Latitude: {formData.lat}</Paragraph>
          <Paragraph>Longitude: {formData.lon}</Paragraph>
          <Paragraph>
            Image 1: {formData.pic1.length > 0 ? 'Image added' : 'Image not added'}
          </Paragraph>
          <Paragraph>
            Image 2: {formData.pic2.length > 0 ? 'Image added' : 'Image not added'}
          </Paragraph>
          <Paragraph>Contact Name: {formData.emergencyContact_name}</Paragraph>
          <Paragraph>Contact No.: {formData.emergencyPhone}</Paragraph>
          <Button onClick={prevPage}>Previous</Button>
          <Button onClick={submitForm}>Submit</Button>
        </FormPage>
      )}
    </FormContainer>
  );
};

export default FormPages;
