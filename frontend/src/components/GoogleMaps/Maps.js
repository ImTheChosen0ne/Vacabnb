// frontend/src/components/Maps/Maps.js
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const Maps = ({ apiKey, spotDetails }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const center = {
    lat: spotDetails.lat,
    lng: spotDetails.lng,
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker position={center} />
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
