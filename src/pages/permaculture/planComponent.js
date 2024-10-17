import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlanComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/inv/FicheProjetPermaculture'); // Remplacez ceci par le chemin de votre route
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '700px' }}>
      <h2>Notre Plan</h2>
      <p>
        En se focalisant en premier lieu sur les francophones, dans la continuité d’initiatives telles que les 
        « Mokhtar Awards » ou « OT1 », l’objectif principal est d’inciter à une consommation alternative des 
        médias et productions audiovisuelles de qualité.
      </p>
      <button 
        onClick={handleClick} 
        style={{ backgroundColor: '#00aaff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}
      >
        Fiche Projet
      </button>
    </div>
  );
};

export default PlanComponent;