
import React from 'react';
import Avatar from '@mui/material/Avatar';

const AvatarComponent = ({ avatarSrc, avatarPosition }) => {
  return (
    // Utilisez les propriétés CSS pour définir la position de l'Avatar
    <Avatar
      src={avatarSrc} // Assurez-vous de passer la source de l'avatar appropriée ici
      sx={{
        position: 'absolute',
        left: avatarPosition.x + 'px', // Utilisez la coordonnée x de la position avec 'px' pour la valeur CSS
        top: avatarPosition.y + 'px', // Utilisez la coordonnée y de la position avec 'px' pour la valeur CSS
        height: 70,
        width: 70,
      }}
    />
  );
};

export default AvatarComponent;