// FormPages.js
import {React,useState} from 'react';
import {
  FormContainer,
  FormPage,
  Label,
  Input,
  Button,
  Paragraph,
  Heading,
  Row,
  Column,
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
  error
}) => {
  const [address, setAddress] = useState('');
  const handleGeocode = async () => {
    try {
      const response = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=65a76b0f60ac1153631483qbj1d5679`);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setFormData(prevData => ({ ...prevData, lat, lon }));
      } else {
        console.error('Geocoding failed. Unable to get latitude and longitude.');
      }
    } catch (error) {
      console.error('Error during geocoding:', error);
    }
  };

  return (
    <FormContainer>
      {currentPage === 1 && (
        <FormPage>
          <Heading>Camera Specifications</Heading>
          <Row>
            <Column>
              <Label>Ip Address</Label>
              <Input
                type="text"
                name="ip"
                value={formData.ip}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>Nickname</Label>
              <Input
                type="text"
                name="nickName"
                value={formData.nickName}
                onChange={handleChange}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Model</Label>
              <Input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </Column>
            <Column>
              <Label>Brand</Label>
              <Input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Megapixels</Label>
              <Input
                type="text"
                name="megapixels"
                value={formData.megapixels}
                onChange={handleChange}
              />
            </Column>
            <Column>
              <Label>Resolution</Label>
              <Input
                type="text"
                name="resolution"
                value={formData.resolution}
                onChange={handleChange}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>FPS</Label>
              <Input
                type="text"
                name="fps"
                value={formData.fps}
                onChange={handleChange}
              />
            </Column>
            <Column>
              <Label>FOV</Label>
              <Input
                type="text"
                name="fov"
                value={formData.fov}
                onChange={handleChange}
              />
            </Column>
            <Column>
              <Label>Camera Index (only for webcam)</Label>
              <Input
                type="text"
                name="index"
                value={formData.index}
                onChange={handleChange}
              />
            </Column>
          </Row>
          <Row>
            <Column></Column>
            <Column align="right">
              <Button onClick={nextPage}>Next</Button>
            </Column>
          </Row>
        </FormPage>
      )}
      {currentPage === 2 && (
        <FormPage>
          <Heading>Add Camera Location Details</Heading>
          <Label>Address</Label>
          <Input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Button onClick={handleGeocode}>Get Latitude and Longitude</Button>
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
           <UploadWidget formData={formData} />

           <Row>
            <Column>
              <Button onClick={prevPage}>Previous</Button>
            </Column>
            <Column align="right">
              <Button onClick={nextPage}>Next</Button>
            </Column>
          </Row>
        </FormPage>
      )}
      {currentPage === 3 && (
        <FormPage>
          <Heading>Add Emergency Contact Details</Heading>
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
         <Row>
            <Column>
              <Button onClick={prevPage}>Previous</Button>
            </Column>
            <Column align="right">
              <Button onClick={nextPage}>Next</Button>
            </Column>
          </Row>
        </FormPage>
      )}
      {currentPage === 4 && (
        <FormPage>
          <Heading>Review your information:</Heading>
          <Paragraph>Ip Address: {formData.ip}</Paragraph>
          <Paragraph>Nickname: {formData.nickName}</Paragraph>
          <Paragraph>Model: {formData.model}</Paragraph>
          <Paragraph>Brand: {formData.brand}</Paragraph>
          <Paragraph>index: {formData.index}</Paragraph>
          <Paragraph>Megapixels: {formData.megapixels}</Paragraph>
          <Paragraph>Resolution: {formData.resolution}</Paragraph>
          <Paragraph>FPS: {formData.fps}</Paragraph>
          <Paragraph>FOV: {formData.fov}</Paragraph>
          <Paragraph>Latitude: {formData.lat}</Paragraph>
          <Paragraph>Longitude: {formData.lon}</Paragraph>
          <Paragraph>
            Image 1: {formData.pic1.length > 0 ? 'Image added' : 'Image not added'}
          </Paragraph>
          {/* <Paragraph>
            Image 2: {formData.pic2.length > 0 ? 'Image added' : 'Image not added'}
          </Paragraph> */}
          <Paragraph>Contact Name: {formData.emergencyContact_name}</Paragraph>
          <Paragraph>Contact No.: {formData.emergencyPhone}</Paragraph>
          <Row>
            <Paragraph><p style={{ color:'red'}}>{error}</p></Paragraph>
            <Column>
              <Button onClick={prevPage}>Previous</Button>
            </Column>
            <Column align="right">
              <Button onClick={submitForm}>Submit</Button>
            </Column>
          </Row>
        </FormPage>
      )}
    </FormContainer>
  );
};

export default FormPages;
