import React from "react";
import { Route, Routes } from "react-router-dom";
import { CalendarScreen } from "../components/calendar/CalendarScreen";

export const DashboardRoutes = () => {
	return (
		<>
			<div>
				<Routes>
					<Route path="/calendar" element={<CalendarScreen />} />
					<Route path="/" element={<CalendarScreen />} />
				</Routes>
			</div>
		</>
	);
};
