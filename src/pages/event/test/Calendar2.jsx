import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr'; // Importez la locale française pour moment.js
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Popping from '../Popping';
import { closeEvent, ShowEventApi, ShowEventsApi } from "../../../redux/actions/event";
import { connect } from 'react-redux';
import {useSelector} from 'react-redux'

moment.locale('fr'); // Définissez la locale française pour moment.js

const localizer = momentLocalizer(moment); // Utilisez momentLocalizer pour appliquer moment.js à react-big-calendar

const MyCalendar = ({ events, ShowEventApi, closeEvent, ShowEventsApi }) => {
  const [open, setOpen] = useState(false);
  const [renderStatus, rerender] = useState(false);
  const token = useSelector(state => state.token)

  const myMessages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: 'Aujourd\'hui',
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda', // Traduction française pour "Agenda"
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    showMore: total => `+ ${total} de plus`
  };
  useEffect(() => {
    ShowEventsApi(token);
    console.log("I rendered because of refresh or start");
  }, []);

  useEffect(() => {
    ShowEventsApi(token);
    console.log("I rendered");
  }, [renderStatus]);

  const openEventClick = (event) => {
    setOpen(true);
    if (event.id) {
      ShowEventApi(event.id, token);
    }
    return;
  }

  const closeEventClick = () => {
    setOpen(false);
    setTimeout(() => closeEvent(token), 300);
  }

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - 100px)', overflow: 'auto' }}> {/* Limitez la hauteur maximale et activez le défilement */}
      <Popping
        open={open}
        handleOpen={openEventClick}
        handleClose={closeEventClick}
        renderStatus={renderStatus}
        rerender={rerender}
      />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, margin: '10px', fontFamily: 'Patrick Hand' }}
        onSelectEvent={openEventClick}
        messages={myMessages} // Ajoutez vos messages personnalisés

      />
    </div>
  );
}

function mapStateToProps({ event, events }) {
  return {
    event,
    events
  }
}

export default connect(mapStateToProps, { ShowEventApi, closeEvent, ShowEventsApi })(MyCalendar);