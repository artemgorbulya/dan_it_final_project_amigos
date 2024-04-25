import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
import { langSelectors } from "./store/lang";
import { mapOperations } from "./store/map";
import { categoriesOperations } from "./store/categories";
import { userOperations } from "./store/user";
import { LIBRARIES } from "./constants/map";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import axios from "axios";
import ErrorBoundary from "./components/ErrorBoundary";
import Socket from "./context/Socket";
import ScrollTop from "./components/ScrollTop";
import "./services/api";

const App = () => {
	const dispatch = useDispatch();
	const lang = useSelector(langSelectors.getLangAbbr);
	const { isLoaded: mapIsLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
		libraries: LIBRARIES,
		language: 'ru'
	});
	const [isLoad, setIsLoad] = useState(false);


	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			axios.post('/api/auth/verify', {token})
				.then(/*async */({data}) => {
					if (data.success) {
						// await dispatch(userOperations.rewriteToken(data.data.token));
						dispatch(userOperations.rewriteToken(data.data.token));
						dispatch(userOperations.dataUserOperation(data.data.user));
					} else
						dispatch(userOperations.removeToken());
				})
				.catch(() => {
					dispatch(userOperations.removeToken());
				})
				.finally(() => setIsLoad(true));
		} else {
			setIsLoad(true);
		}

		dispatch(categoriesOperations.getCategories());
	}, [dispatch]);

	useEffect(() => {
		if (mapIsLoaded) {
			dispatch(mapOperations.setLocation(lang));
		}
	}, [dispatch, lang, mapIsLoaded]);

	return (
		<ErrorBoundary>
			<BrowserRouter>
				{isLoad &&
					<>
					  <Socket>
							<AppRoutes />
							<ScrollTop />
						</Socket>
					</>
				}
			</BrowserRouter>
		</ErrorBoundary>
	);
};

export default App;
