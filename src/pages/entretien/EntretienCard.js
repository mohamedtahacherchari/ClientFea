import React from 'react';

const EntretienCard = ({ imageUrl, name, description, fonction }) => {
  const cardStyle = {
    width: '500px',
    height: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  };

  const imageContainerStyle = {
    width: '200px',
    height: '200px',
    position: 'relative',
    marginBottom: '25px',
    marginTop: '30px',
  };

  const diamondBackgroundStyle = {
    position: 'absolute',
    width: '230px',
    height: '230px',
    backgroundColor: '#d3d3d3',
    transform: 'rotate(45deg)',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    zIndex: 0,
  };

  const imageStyle = {
    width: '200px',
    height: '200px',
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    objectFit: 'contain', // Change to 'contain' to fit the image inside without cutting
  };

  const titleStyle = {
    backgroundColor: '#ffcc00',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '20px 0',
    marginBottom: '20px',
  };

  const subtitleStyle = {
    color: '#666',
    fontSize: '20px',
    marginBottom: '25px',
  };

  const descriptionStyle = {
    fontSize: '18px',
    color: '#333',
  };

  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        <div style={diamondBackgroundStyle}></div>
        <img src={imageUrl} alt={name} style={imageStyle} />
      </div>
      <div style={titleStyle}>{name}Entretien Pro</div>
      <div style={subtitleStyle}>{fonction}</div>
      <div style={descriptionStyle}>
        Très expérimenté associativement,
        <strong><u>{description}</u></strong> 
        s'occupe des Grands Entretiens . Sous sa coordination les
        membres FEA profitent d'intervention d'experts sur les 
        champs spirituels et profanes . Une très belle occasion 
        d'apprendre à tisser des liens avec les autres membres sous l'une du 
        savoir . 
      </div>
    </div>
  );
};

export default EntretienCard;
