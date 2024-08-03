// src/GoogleMap.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Home = ({ location }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAmlthY_yyE4XKzkfGFyFQcilLbSPocyOY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Home;
