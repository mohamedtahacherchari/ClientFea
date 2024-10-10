import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { fetchAllUsers, dispatchGetAllUsers } from '../../src/redux/actions/usersAction';
import { useSelector, useDispatch } from 'react-redux';
import './UserMap.css';

// Fix for default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 6);
    }
  }, [center, map]);
  return null;
}

function UserMap() {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);
  const { isAdmin } = auth;
  const users = useSelector(state => state.users);
  const [coordinates, setCoordinates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [mapCenter, setMapCenter] = useState([48.8566, 2.3522]); // Initial center
  const dispatch = useDispatch();

  useEffect(() => {
    //if (isAdmin) {
      fetchAllUsers(token).then(res => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
 // }
  , [token, isAdmin, dispatch]);

  useEffect(() => {
    const geocodeCities = async () => {
      const geocodePromises = users.map(user => geocodeCity(user.city));
      const coords = await Promise.all(geocodePromises);
      setCoordinates(coords.filter(coord => coord !== null));
    };

    geocodeCities();
  }, [users]);

  const geocodeCity = async (city) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: city,
          format: 'json',
          limit: 1
        }
      });
      const data = response.data[0];
      if (data) {
        return {
          city,
          coordinates: [parseFloat(data.lat), parseFloat(data.lon)],
        };
      }
    } catch (error) {
      console.error('Error geocoding city:', error);
    }
    return null;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const user = users.find(user => 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase())
    );
    if (user) {
      setSelectedUser(user);
      const userCoord = coordinates.find(coord => coord.city === user.city);
      if (userCoord) {
        setMapCenter([userCoord.coordinates[0], userCoord.coordinates[1]]);
      }
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    const userCoord = coordinates.find(coord => coord.city === user.city);
    if (userCoord) {
      setMapCenter([userCoord.coordinates[0], userCoord.coordinates[1]]);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '300px', overflowY: 'auto', padding: '10px' }}>
        <h3>Recherche d'utilisateur</h3>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Chercher par nom..." 
          style={{ width: '100%', padding: '5px' }}
        />
        {users.map((user, index) => (
          <div key={index} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
            
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <MapContainer center={mapCenter} zoom={6} style={{ height: '100%', width: '100%' }}>
          <RecenterMap center={mapCenter} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinates.map((item, index) => (
            item && (
              <Marker 
                key={index} 
                position={item.coordinates}
              >
                <Tooltip permanent direction="top" offset={[0, -10]}>
                  <strong>{users[index].firstName} {users[index].lastName}</strong> - {item.city}
                </Tooltip>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default UserMap;
