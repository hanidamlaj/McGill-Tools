import React from "react";
import { Route, Switch } from "react-router-dom";

import LinearProgress from "@material-ui/core/LinearProgress";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import HomeContainer from "../containers/homeContainer";
import LoginContainer from "../containers/logged_out/loginContainer";
import UnauthenticatedContainer from "../containers/logged_out/unauthenticatedContainer";

import { theme, IsSmallContext } from "../shared/";

function App({ token, loaders }) {
	/**
	 * boolean flag to indicate if viewport matches small/medium device
	 * same as theme.breakpoints.down("md")
	 * @type {boolean}
	 */
	const isSmallDevice = useMediaQuery("(max-width:1279.95px)");

	return (
		<ThemeProvider theme={theme}>
			<IsSmallContext.Provider value={isSmallDevice}>
				{loaders.length > 0 && (
					<div
						style={{
							position: "absolute",
							top: 0,
							width: "100%",
							zIndex: 1200
						}}
					>
						<LinearProgress color="primary" />
					</div>
				)}
				{token ? (
					<HomeContainer />
				) : (
					<Switch>
						<Route exact path="/login" component={LoginContainer} />
						<Route path="/" component={UnauthenticatedContainer} />
					</Switch>
				)}
			</IsSmallContext.Provider>
		</ThemeProvider>
	);
}

export default App;
