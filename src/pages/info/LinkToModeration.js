import React from 'react'
import GoogleDrivePdfViewer from './GoogleDrivePdfViewer ';

const LinkToModeration = () => {
    const fileId = '1OpV08cpb_PsMx0JUdauSZWVLLxjzFbEv';

  return (
    <div>
    <h1>Vous trouverez ci-dessous les règles de modération de FEA</h1>
    <GoogleDrivePdfViewer fileId={fileId} />
    </div>
  )
}

export default LinkToModeration