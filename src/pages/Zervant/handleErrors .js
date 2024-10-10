import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrors = (error, info) => {
      // Gérer l'erreur ici, par exemple, la journaliser ou afficher une interface de secours
      console.error(error);
      setHasError(true);
    };

    // Ajouter l'écouteur d'erreurs
    window.addEventListener('error', handleErrors);

    // Nettoyer l'écouteur d'erreurs lors du démontage du composant
    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);

  if (hasError) {
    // Rendre une interface de secours ou un message d'erreur
    return <div>Une erreur est survenue.</div>;
  }

  return children;
}

export default ErrorBoundary;
