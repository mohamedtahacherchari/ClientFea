import React from 'react';

const Actions = ({description}) => {
  return (
    <div style={{ marginBottom: '800px' }}>
      <h1>Une action très importante est en cours qui a pour but d'ivestir <br/>
        collectivement dans un projet immobilier. Un questionnaire a déjà remplit par les membres <br/>
        intéressés et l'analyse des résultats est en cours . Pour plus d'information <br/>
        n'hésitez pas à vous approcher de {description} </h1> 
      
    </div>
  );
};

export default Actions;