import React, {useEffect} from 'react';
//import { Document, Page } from 'react-pdf';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ShowEventsApi } from "../../../redux/actions/event";
import { connect } from 'react-redux';

const PDFViewerComponent = () => {
    const { id } = useParams(); // Récupérer l'ID de l'URL
    const dispatch = useDispatch();
    const events = useSelector(state => state.events);
    console.log(events,"loooool")
    const token = useSelector(state => state.token);
    const eventpdf = events.find(event => event.id === id);
    console.log(eventpdf.pdfUrl, "miyaaa")


    useEffect(() => {
        dispatch(ShowEventsApi(token));
      }, [dispatch, token]);
return (
        <div>
{  /*  <Typography variant="body1">
      <Document file={eventpdf.pdfUrl}>
        <Page pageNumber={1} />
      </Document>
</Typography>*/}
    </div>
    );
};
export default connect(null, {ShowEventsApi})(PDFViewerComponent);
