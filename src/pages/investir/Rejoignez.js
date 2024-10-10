import React from 'react';
import { useNavigate } from 'react-router-dom';



const Rejoignez = () => {

    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/FicheProjetInvestir'); // Remplacez ceci par le chemin de votre route
  };
  return (
    <div style={{ marginBottom: '800px', paddingLeft: '20px' }}>
  {/* Texte de présentation du centre d'interaction */}
  <p style={{ paddingLeft: '20px' }}>
    Retrouvez ici notre dernière fiche expliquant la manière dont nous animons ce centre 
    d'interaction très important. Si vous avez des remarques ou des points d'amélioration,
    surtout n'hésitez pas à revenir vers nous via <a href="mailto:teamorga.fea@gmail.com">teamorga.fea@gmail.com</a>.
  </p>

  {/* Bouton pour télécharger la fiche projet */}
  <button 
    onClick={handleClick} 
    style={{ 
      backgroundColor: '#00aaff', 
      color: '#fff', 
      border: 'none', 
      padding: '10px 20px', 
      borderRadius: '5px', 
      marginBottom: '40px',
      marginLeft: '20px' // Ajout d'espace à gauche pour le bouton
    }}
  >
    Fiche Projet
  </button>

  {/* Titre de la section */}
  <h1 style={{ paddingLeft: '20px' }}>Description intérêt FEA PRO</h1>

  {/* Texte descriptif des opportunités avec FEA PRO */}
  <p style={{ paddingLeft: '20px' }}>
    Vous recherchez un emploi ou un stage ?<br />
    Vous souhaitez être accompagné pour monter en compétences dans votre entreprise ?<br />
    Vous souhaitez partager votre expertise ?<br />
    N'hésitez pas à nous contacter pour nous rejoindre sur FEA PRO.
  </p>
</div>
  );
};

export default Rejoignez;
