// src/components/LocationList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const LocationList = ({ locations }) => {
  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locations.map((location) => (
          <li key={location._id}>
            <Link to={`/locations/${location._id}`}>{location.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
