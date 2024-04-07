// src/components/AddDeviceForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddDeviceForm = ({ locationId, onAddDevice }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(''); 
  const [status, setStatus] = useState('active');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/locations/${locationId}/devices`, {
        serialNumber,
        type,
        image, 
        status,
      });
      onAddDevice(response.data); 
      setSerialNumber('');
      setType('');
      setImage(''); 
      setStatus('active');
    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Device</h2>
      <label htmlFor="serialNumber">Serial Number:</label>
      <input
        type="text"
        id="serialNumber"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
        required
      />
      <label htmlFor="type">Type:</label>
      <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="pos">POS Terminal</option>
        <option value="kiosk">Kiosk</option>
        <option value="signage">Signage</option>
      </select>
      <label htmlFor="image">Image (Optional):</label>
      <input
        type="file" 
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.files[0])} 
      />
      <label htmlFor="status">Status:</label>
      <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit">Add Device</button>
    </form>
  );
};

export default AddDeviceForm;
