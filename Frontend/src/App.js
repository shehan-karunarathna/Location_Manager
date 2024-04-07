// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationList from './components/LocationList';
import LocationDetails from './components/LocationDetails';
import axios from 'axios';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
       
        const response = await axios.get('/api/locations');
        setLocations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocationList locations={locations} />} />
        <Route path="/locations/:locationId" element={<LocationDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
