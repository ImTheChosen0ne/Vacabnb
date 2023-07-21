// frontend/src/components/Maps/Maps.js
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Maps = ({ apiKey, spotDetails }) => {
  console.log(spotDetails.lat)
  console.log(spotDetails.lng)

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const center = {
    lat: parseFloat(spotDetails.lat),
    lng: parseFloat(spotDetails.lng),
  };
  console.log("Is Google Maps API loaded?", isLoaded);
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
