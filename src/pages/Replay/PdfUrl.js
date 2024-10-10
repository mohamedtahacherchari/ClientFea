import React from 'react';
import { usePdf } from 'react-pdf-js';

const MyPDFViewer = ({ events }) => {
    //ùùù                                                                     'const event = events && events.find(event => event.id === id); // Trouver l'événement avec l'ID correspondant

  const [loading, error, pdf] = usePdf({
    url: event.pdfUrl,
    onDocumentComplete: (numPages) => {
      // Gérer l'événement de chargement du document
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while loading PDF: {error.message}</div>;

  return (
    <div>
      {pdf && pdf.pages.map((page, index) => (
        <img key={index} src={page} alt={`Page ${index + 1}`} />
      ))}
    </div>
  );
};

export default MyPDFViewer;
