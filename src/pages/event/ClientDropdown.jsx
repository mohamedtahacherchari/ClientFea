import React, { useState, useRef, useEffect } from 'react';

const ClientDropdown = ({ users, selectedClients, setSelectedClients }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setDropdownOpen(prevState => !prevState); // Toggle the dropdown open state
  };

 /* const handleCheckboxChange = (event, clientId) => {
    if (event.target.checked) {
      setSelectedClients([...selectedClients, clientId]);
    } else {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    }
  };
*/
// Exemple de fonction pour gérer les changements
const handleCheckboxChange = (clientId) => {
  setSelectedClients(prevSelectedClients => {
    if (prevSelectedClients.includes(clientId)) {
      // Si le client est déjà sélectionné, le retirer
      return prevSelectedClients.filter(id => id !== clientId);
    } else {
      // Sinon, ajouter le client à la liste des sélectionnés
      return [...prevSelectedClients, clientId];
    }
  });
};
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  console.log(users,"les utilisateurs")
  console.log(selectedClients,"les utilisateurs séléctionnées")

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
        Select Clients
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
 {users.map(client => {
            console.log(client._id, selectedClients.includes(client._id)); // Vérifie si l'ID du client est dans selectedClients
            console.log(selectedClients);
            console.log('Comparing:', client._id === selectedClients[0]); // Teste si le premier ID dans selectedClients correspond au client actuel
            console.log('Comparing:', client._id, selectedClients.includes(String(client._id)));
            console.log('Comparing:', String(client._id), selectedClients.map(id => String(id)).includes(String(client._id)));
            console.log('selectedClients:', selectedClients);

            return (
              <div key={client._id} style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                <input
                  type="checkbox"
                  id={`client-${client._id}`}
                  value={client._id}
                 checked={selectedClients.includes(client._id)} // Vérifiez si ce code fonctionne correctement
            // checked={selectedClients.some(selectedClient => selectedClient._id === client._id)}
             //checked={selectedClients.some(selectedClient => selectedClient === client._id || selectedClient._id === client._id)}

                 // onChange={(event) => handleCheckboxChange(event, client._id)}
                 onChange={() => handleCheckboxChange(client._id)}
                  style={{ marginRight: '10px' }}
                />
                <label htmlFor={`client-${client._id}`}>{client.firstName} {client.lastName}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientDropdown;



