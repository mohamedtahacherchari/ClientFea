

import React, { useState, useRef, useEffect } from 'react';

const ClientDropdown = ({ users, selectedClients, setSelectedClients }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setDropdownOpen(prevState => !prevState); // Toggle the dropdown open state
  };

  // Modification: Fonction pour permettre la sélection d'un seul client
  const handleRadioChange = (clientId) => {
    setSelectedClients([clientId]); // Sélectionne uniquement ce client
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        type="button" 
        onClick={handleButtonClick} 
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        Choisissez le chef d'équipe.
        <span style={{ marginLeft: '8px', fontSize: '12px' }}>
          {dropdownOpen ? '▲' : '▼'}
        </span>
      </button>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: 1,
            width: '300px',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {users.map(client => (
            <div key={client._id} style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
              <input
                type="radio" // Utilisation d'un bouton radio pour forcer la sélection unique
                id={`client-${client._id}`}
                value={client._id}
                checked={selectedClients.includes(client._id)} // Vérifie si l'ID du client est dans selectedClients
                onChange={() => handleRadioChange(client._id)} // Sélectionne ce client
                style={{ marginRight: '10px' }}
              />
              <label htmlFor={`client-${client._id}`}>{client.firstName} {client.lastName}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDropdown;

