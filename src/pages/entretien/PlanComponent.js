import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlanComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/inv/FicheProjetEntretien'); // Remplacez ceci par le chemin de votre route
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '700px' }}>
      <h2>Notre Plan </h2>
      <p>
     Retrouvez ici notre dernière fiche expliquant la manière dont nous animons ce centre 
     d'interaction très important . Si vous avez remarques ou des points d'amélioration 
     surtout n'hésitez pas à revenir vers nous via teamorga.fea@gmail.com
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