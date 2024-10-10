// FormulaireTelechargementFichier.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'
import { FormControl } from '@chakra-ui/react';

const FileUploadForm  = (onFileUpload) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // Nouvel état pour stocker le nom du fichier

  const token = useSelector(state => state.token)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : ''); // Mettez à jour le nom du fichier
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Appel de la fonction parent pour traiter le fichier téléchargé
      onFileUpload(response.data.filePath);
    } catch (error) {
      // Gérer les erreurs de téléchargement
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {fileName && <p>Selected File: {fileName}</p>} {/* Affiche le nom du fichier sélectionné */}
    </div>
  );
};

export default FileUploadForm ;
