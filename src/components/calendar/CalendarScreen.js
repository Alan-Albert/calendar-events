import React, { useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [{
    title: 'Cumpleaños del jefote',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '$fafafa',
    notes: 'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Juan'
    }
}];

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            display: 'block'
        }

        return {
            style
        }
    };

    const onDoubleClick = (e) => {
        console.log(e);
    }
    
    const onSelectEvent = (e) => {
        console.log(e);
    }
    
    const onViewChange  = (e) => {
        console.log(e);
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    

	return (
		<div className="calendar-screen">
			<Navbar />

			<Calendar
				localizer={localizer}
				events={ events }
				startAccessor="start"
				endAccessor="end"
                messages={messages}
                eventPropGetter= { eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={lastView}
			/>

            <CalendarModal/>
		</div>
	);
};
