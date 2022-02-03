import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActive, eventSetActive, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const { events, activeEvent } = useSelector( state => state.calendar);
    const { uid } = useSelector( state => state.auth);

    const dispatch = useDispatch();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
      dispatch( eventStartLoading() );
    }, [dispatch]);
    

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: ( uid ===event.user._id ) ? '#367CF7' : '#464646',
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
        dispatch( uiOpenModal() );
    }
    
    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    }
    
    const onViewChange  = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActive() );
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
                onSelectSlot={ onSelectSlot }
                selectable={true}
                view={lastView}
			/>

            <AddNewFab />
            {
               activeEvent && <DeleteEventFab />
            }
            <CalendarModal/>
		</div>
	);
};
