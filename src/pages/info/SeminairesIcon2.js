import React from 'react';
import AtefImage from '../../image/Seminaires2.png'; // Import the image using require

const SeminairesIcon2 = () => {
  return (
    <div>
   <h1>Séminaire virtuel - 13 Juin 2020. Inscrivez-vous vite !</h1>
     <img src={AtefImage} alt="" />
     <div style={{ marginLeft: '150px', textAlign: 'center' }}>
          <iframe
            width="760"
            height="515"
            src="https://www.youtube.com/embed/WjMYfGvvLss"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
    </div>
  );
};

export default SeminairesIcon2;
