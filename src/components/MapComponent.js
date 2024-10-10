/** import React, { useState, useEffect, useRef } from 'react';
import './Autocomplete.css'; // Importez votre fichier de styles CSS

function MapComponent({setCity,city}) {
 // const [city, setcity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function getSuggestions(query) {
      if (query === '') {
        setSuggestions([]);
        return;
      }

      try {
        const apiUrl = "https://api-adresse.data.gouv.fr/search/?q=";
        const response = await fetch(apiUrl + query.toLowerCase() + '&limit=5');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSuggestions(data.features.map(feature => feature.properties.label));
        setSelectedSuggestionIndex(-1);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]); // Clear suggestions if there's an error
      }
    }

    if (city) {
      getSuggestions(city);
    }
  }, [city]);

  function handleInputChange(e) {
    setCity(e.target.value.toLowerCase());
  }

  function handleSuggestionClick(index) {
    setCity(suggestions[index]);
    setSuggestions([]);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedSuggestionIndex < suggestions.length - 1) {
        setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedSuggestionIndex > 0) {
        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
      }
    } else if (e.key === 'Enter') {
      if (selectedSuggestionIndex !== -1) {
        setCity(suggestions[selectedSuggestionIndex]);
        setSuggestions([]);
      }
    }
  }

  function handleClickOutside(e) {
    if (!inputRef.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fonction pour gérer le clic sur une lettre de l'alphabet
  function handleAlphabetClick(letter) {
    setCity(letter);
  }

  return (
    <div>
      <h1>Lieu de résidence :</h1>

      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <div className="dropdown" ref={dropdownRef}>
        {suggestions.map((suggestion, index) => (
          <p
            key={index}
            className={`list-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
            onClick={() => handleSuggestionClick(index)}
          >
            {suggestion}
          </p>
        ))}
      </div>
    </div>
  );
}

export default MapComponent;

**/
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Autocomplete.css'; // Import your CSS file

function MapComponent({ setCity, city }) {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function getSuggestions(query) {
      if (query === '') {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(`http://api.geonames.org/searchJSON`, {
          params: {
            q: query,
            maxRows: 10,
            username: 'tahahoussem', // Replace with your GeoNames username
            lang: 'fr' // Request results in French
          }
        });

        console.log('API response:', response.data); // Debug: log API response

        if (response.data.geonames) {
          setSuggestions(response.data.geonames.map(place => ({
            name: place.name,
            countryName: place.countryName,
            postalCode: place.postalCode,
            adminName1: place.adminName1, // State or region
            adminName2: place.adminName2, // County or second-level region
            adminName3: place.adminName3, // City or third-level region
            address: place.address // Street address, if available
          })));
        } else {
          setSuggestions([]);
        }
        setSelectedSuggestionIndex(-1);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        console.error('Error details:', error.response); // Log detailed error
        setSuggestions([]); // Clear suggestions if there's an error
      }
    }

    if (city) {
      getSuggestions(city);
    }
  }, [city]);

  function handleInputChange(e) {
    setCity(e.target.value);
  }

  function handleSuggestionClick(index) {
    setCity(`${suggestions[index].name}, ${suggestions[index].countryName}`);
    setSuggestions([]);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedSuggestionIndex < suggestions.length - 1) {
        setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedSuggestionIndex > 0) {
        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
      }
    } else if (e.key === 'Enter') {
      if (selectedSuggestionIndex !== -1) {
        setCity(`${suggestions[selectedSuggestionIndex].name}, ${suggestions[selectedSuggestionIndex].countryName}`);
        setSuggestions([]);
      }
    }
  }

  function handleClickOutside(e) {
    if (!inputRef.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h1>Lieu de résidence :</h1>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <div className="dropdown" ref={dropdownRef}>
        {suggestions.map((suggestion, index) => (
          <p
            key={index}
            className={`list-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
            onClick={() => handleSuggestionClick(index)}
          >
            {suggestion.name}, {suggestion.adminName3}, {suggestion.adminName2}, {suggestion.adminName1}, {suggestion.countryName} {suggestion.postalCode}
          </p>
        ))}
      </div>
    </div>
  );
}

export default MapComponent;


