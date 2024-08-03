// // src/App.js
// import React, { useState, useEffect } from 'react';
// import Home from './component';

// function LiveData() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error(error);
//           // Handle error here (e.g., user denied location access)
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   return (
//     <div className="App">
//       {location ? (
//         <Home location={location} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default LiveData;


// src/LiveMap.js
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import bike from '../bike.jpg';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

// Default location to center the map initially
const defaultLocation = {
  lat: 37.7749,
  lng: -122.4194
};

const LiveMap = () => {
  const [location, setLocation] = useState(defaultLocation);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          if (mapRef.current) {
            mapRef.current.panTo({ lat: latitude, lng: longitude });
          }
          console.log("LATITUde",location);
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 0 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAmlthY_yyE4XKzkfGFyFQcilLbSPocyOY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
        onLoad={(map) => (mapRef.current = map)}
      >
        <Marker
          position={location}
          icon={bike} // Custom marker icon
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveMap;

