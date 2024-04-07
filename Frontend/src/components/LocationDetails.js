// src/components/LocationDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddDeviceForm from './AddDeviceForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const LocationDetails = () => {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`/api/locations/${locationId}`);
        setLocation(response.data);
        setDevices(response.data.devices);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocation();
  }, [locationId]);

  const handleAddDevice = async (deviceData) => {
    try {
      const response = await axios.post(`/api/locations/${locationId}/devices`, deviceData);
      setDevices([...devices, response.data]); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveDevice = async (deviceId) => {
    try {
      await axios.delete(`/api/locations/${locationId}/devices/${deviceId}`);
      setDevices(devices.filter((device) => device._id !== deviceId)); // Update local devices state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {location ? (
        <>
          <h2>{location.name}</h2>
          <p>Address: {location.address}</p>
          <p>Phone: {location.phone}</p>
          <h3>Devices</h3>
          <ul>
            {devices.map((device) => (
              <li key={device._id}>
                {device.serialNumber} ({device.type}) - {device.status}
                <button onClick={() => handleRemoveDevice(device._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <AddDeviceForm locationId={locationId} onAddDevice={handleAddDevice} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LocationDetails;
