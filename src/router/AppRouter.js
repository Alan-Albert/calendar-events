import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<CalendarScreen />} />
            
        </Routes>
    </BrowserRouter>
    );
  };