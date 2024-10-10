import React from 'react';
import AtefImage from '../../image/EA.jpg'; // Importez l'image en utilisant require

function BackgroundPhoto() {
  return (
    <div>
      {/* Utilisez la variable AtefImage comme source de l'image */}
      <p>BIENVENUE DANS VOTRE ESPACE MEMBRE</p>
      <h1>Fraternité en Action </h1>
      <img src={AtefImage}  alt="" />
      <p>
      At-Tabarani, que Dieu le bénisse, a rapporte selon Abdullah ibn Omar qu'Allah les agrée, que le Messager d'Allah a dit "L'homme le plus aimé d'Allah est celui qui est le plus utile aux hommes. Et l'œuvre la plus aimée d'Allan est une jole procurée à un musulman, ou un souci dissipé, ou une dette payée, ou une faim satisfaite. Certes, que j'accompagne un frère à régler un besoin est plus aimë de moi que de faire une retraite (itikaf) d'un mois à cette mosquée (Al Masjd Annabawi a Medine)

Cet espace est à usage strictement personnelAt-Tabarani, que Dieu le bénisse, a rapporte selon Abdullah ibn Omar qu'Allah les agrée, que le Messager d'Allah a dit "L'homme le plus aimé d'Allah est celui qui est le plus utile aux hommes. Et l'œuvre la plus aimée d'Allan est une jole procurée à un musulman, ou un souci dissipé, ou une dette payée, ou une faim satisfaite. Certes, que j'accompagne un frère à régler un besoin est plus aimë de moi que de faire une retraite (itikaf) d'un mois à cette mosquée (Al Masjd Annabawi a Medine)

Cet espace est à usage strictement personnel
      </p>
    </div>
  );
}

export default BackgroundPhoto;
