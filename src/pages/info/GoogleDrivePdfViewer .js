import React from 'react';

const GoogleDrivePdfViewer = ({ fileId }) => {
  // Construire l'URL de visualisation du PDF sur Google Drive
  const pdfUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div>
      <iframe
        title="PDF Viewer"
        src={pdfUrl}
        width="100%"
        height="500px"
        frameBorder="0"
        scrolling="auto"
      />
    </div>
  );
};

export default GoogleDrivePdfViewer;
