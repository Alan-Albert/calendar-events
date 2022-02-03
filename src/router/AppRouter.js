import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { Login } from '../components/auth/Login';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startChecking());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='login'
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path='/*'
					element={
						<PrivateRoute>
							<DashboardRoutes />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};
