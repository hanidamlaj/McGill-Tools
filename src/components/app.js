import React from "react";
import { Route, Switch } from "react-router-dom";

import LinearProgress from "@material-ui/core/LinearProgress";
import { ThemeProvider } from "@material-ui/styles";

import HomeContainer from "../containers/homeContainer";
import LoginContainer from "../containers/logged_out/loginContainer";
import UnauthenticatedContainer from "../containers/logged_out/unauthenticatedContainer";

import theme from "../shared/theme";

function App({ token, loaders }) {
	return (
		<ThemeProvider theme={theme}>
			{loaders.length > 0 && (
				<div
					style={{ position: "absolute", top: 0, width: "100%", zIndex: 1200 }}
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
		</ThemeProvider>
	);
}

export default App;
