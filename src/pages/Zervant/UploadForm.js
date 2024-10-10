import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Image téléchargée avec succès');
      //console.log(selectedFile)
    } catch (error) {
      console.error(error);
      
      alert('Erreur lors du téléchargement de l\'image');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginTop:"200px"}}>
      <input type="file"  name="image" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
