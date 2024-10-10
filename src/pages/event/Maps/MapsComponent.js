import React, { useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ["places"];
const mapContainerStyle = {
  width: '100%',
  height: '400px'
};
const center = {
  lat: 51.505,
  lng: -0.09
};

function MapsComponent() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (loadError) return "Erreur de chargement de la carte";
  if (!isLoaded) return "Chargement de la carte...";

  const handleSearch = () => {
    const map = mapRef.current;
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch({ query: searchText }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSearchResult(results[0]);
      }
    });
  };

  return (
    <div>
      <div>
        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Rechercher..." />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onLoad={(map) => mapRef.current = map}
      >
        {searchResult && (
          <Marker
            position={{ lat: searchResult.geometry.location.lat(), lng: searchResult.geometry.location.lng() }}
            onClick={() => setSelectedPlace(searchResult)}
          />
        )}
        {selectedPlace && (
          <InfoWindow
            position={{ lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h2>{selectedPlace.name}</h2>
              <p>{selectedPlace.formatted_address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default MapsComponent;
