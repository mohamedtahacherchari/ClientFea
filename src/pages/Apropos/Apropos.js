import React from 'react';
import AtefImage from '../../image/EA.jpg'; // Importez l'image en utilisant require
const AppInfo = () => {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Logo Section */}
      <div>
        <img
          src={AtefImage}
          alt="FEA Logo"
          style={{ width: '80px', height: '80px', borderRadius: '15px' }}
        />
      </div>

      {/* Title Section */}
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>FEA</h1>

      {/* Information Section */}
      <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <span>Author</span>
          <span>Fraternité En Action</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <span>Share</span>
          <a href="https://ld9rq.glideapp.io/" target="_blank" rel="noopener noreferrer">ld9rq.glideapp.io</a>
        </div>
       {/* <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <span>Support</span>
          <a href="#support" style={{ color: '#007bff' }}>Send feedback</a>
        </div>*/}
      </div>
    </div>
  );
};

export default AppInfo;