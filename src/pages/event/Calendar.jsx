import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { fr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Popping from './Popping';
import { closeEvent, ShowEventApi, ShowEventsApi } from "../../redux/actions/event";
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

const locales = {
  'fr': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Configuration des formats de dates pour afficher en français
const formats = {
  dayFormat: (date, culture, localizer) => localizer.format(date, 'dd', culture),
  weekdayFormat: (date, culture, localizer) => localizer.format(date, 'EEEE', culture),
  monthHeaderFormat: (date, culture, localizer) => localizer.format(date, 'MMMM yyyy', culture),
  dayHeaderFormat: (date, culture, localizer) => localizer.format(date, 'EEEE dd/MM', culture),
};

const MyCalendar = ({ events, ShowEventApi, closeEvent, ShowEventsApi }) => {
  const token = useSelector(state => state.token);
  const [open, setOpen] = useState(false);
  const [renderStatus, rerender] = useState(false);

  useEffect(() => {
    ShowEventsApi(token);
  }, []);
  
  useEffect(() => {
    ShowEventsApi(token);
  }, [renderStatus]);

  const openEventClick = (event) => {
    setOpen(true);
    if (event.id) {
      ShowEventApi(event.id, token);
    }
  };

  const closeEventClick = () => {
    setOpen(false);
    setTimeout(() => closeEvent(token), 300);
  };

  return (
    <div>
      <Popping open={open} handleOpen={openEventClick} handleClose={closeEventClick} renderStatus={renderStatus} rerender={rerender} />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: 50, fontFamily: "sans-serif" }}
        onSelectEvent={openEventClick}
        messages={{
          today: 'Aujourd’hui',
          previous: 'Précédent',
          next: 'Suivant',
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          allDay: 'Toute la journée'
        }}
        formats={formats}
        culture="fr"
      />
    </div>
  );
};

function mapStateToProps({ event, events }) {
  return {
    event,
    events
  };
}

export default connect(mapStateToProps, { ShowEventApi, closeEvent, ShowEventsApi })(MyCalendar);
