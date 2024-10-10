import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { ShowEducationsApi } from "../../redux/actions/education/educationsAction";

const FicheProjet = ({ ShowEducationsApi }) => {
  const token = useSelector(state => state.token);
  const educations = useSelector(state => state.educations);
  const [pdfContent, setPdfContent] = useState(null);

  const activeEducations = educations.filter(education => education.isActive);
  const firstActiveEducation = activeEducations[0] || {};

  useEffect(() => {
    ShowEducationsApi(token);
  }, [token]);

  useEffect(() => {
    if (firstActiveEducation && firstActiveEducation.pdfUrl) {
      const fetchPDF = async () => {
        try {
          const response = await fetch(firstActiveEducation.pdfUrl);
          const blob = await response.blob();
          setPdfContent(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fetchPDF();
    }
  }, [firstActiveEducation]);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      {pdfContent && (
        <iframe
          title="PDF Viewer"
          src={`${pdfContent}`}
          style={{ width: '100vw', height: '100vh', border: 'none' }}
        />
      )}
    </div>
  );
};

//export default FicheProjet;
export default connect(null, { ShowEducationsApi })(FicheProjet);
