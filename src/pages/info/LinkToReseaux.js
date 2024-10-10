import React from 'react'
import GoogleDrivePdfViewer from './GoogleDrivePdfViewer ';

const LinkToReseaux = () => {
     // ID du fichier PDF sur Google Drive
  const fileId = '1M-2hT8swyYFUE-TUHgN_ygHr4minP3GX';

 //const fileId = 'https://drive.google.com/file/d/1M-2hT8swyYFUE-TUHgN_ygHr4minP3GX/view?usp=sharing';
  return (
     <div>
     <h1>Vous trouverez ci-dessous la présentation de FEA Reseau</h1>
     <GoogleDrivePdfViewer fileId={fileId} />
     </div>
  )
}

export default LinkToReseaux