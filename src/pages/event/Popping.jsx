import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEventApi, closeEvent } from "../../redux/actions/event";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { enUS, fr } from 'date-fns/locale';  // Import des locales nécessaires
import { parseISO, format } from 'date-fns';
import parse from 'date-fns/parse';
import { dateFnsLocalizer } from "react-big-calendar";
import getDay from 'date-fns/getDay';

const useStyles = makeStyles({
  buttonCustom: {
    textTransform: 'none'
  }
});

// Configurez le localisateur ici (si vous utilisez Calendar)
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => new Date(),
  getDay,
  locales: { fr }
});

const formatDate = (dateString) => {
  try {
    // Parsing des dates qui sont en anglais
    const date = parse(dateString, "EEE dd MMM yy hh:mm a", new Date(), { locale: enUS });
    // Formatage en français
    return format(date, "PPPP à HH:mm", { locale: fr });
  } catch (error) {
    console.error("Erreur lors du formatage de la date:", error);
    return "Date invalide";
  }
}

const Popping = ({ open, handleClose, event, deleteEventApi, renderStatus, rerender }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const token = useSelector(state => state.token);
  const { id, describe, title, start, end } = event;

  const handleDelete = async () => {
    await deleteEventApi(id, token);
    rerender(!renderStatus);
  };
  console.log("Start Date:", start);
  console.log("End Date:", end);
  const modal = () => (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {describe ? <p className="lead">{describe}</p> : "Aucune description disponible"}
        <div className="row justify-content-between">
          <p className="col small text-muted text-center pb-0 mb-0">De: {formatDate(start)}</p>
          <p className="col small text-muted text-center pb-0 mb-0">À: {formatDate(end)}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" color="warning" onClick={handleClose} className={classes.buttonCustom}>
          Fermer
        </Button>
        <Link to={`/event/${id}/update`}>
          <Button variant="contained" color="success" className={classes.buttonCustom}>
            Mettre à jour
          </Button>
        </Link>
        <Button variant="contained" color="error" onClick={handleDelete} className={classes.buttonCustom}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return id ? modal() : <p>Aucun modal à prévisualiser</p>;
};

function mapStateToProps({ event }) {
  return { event };
}

export default connect(mapStateToProps, { deleteEventApi, closeEvent })(Popping);
