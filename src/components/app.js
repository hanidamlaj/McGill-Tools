import React from "react";

import { LinearProgress } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import HomeContainer from "../containers/homeContainer";
import UnauthenticatedContainer from "../containers/logged_out/unauthenticatedContainer";

import theme from "../shared/theme";

function App({ token, loaders }) {
	return (
		<ThemeProvider theme={theme}>
			{loaders.length > 0 && (
				<div style={{ position: "absolute", width: "100%", zIndex: 1200 }}>
					<LinearProgress color="primary" />
				</div>
			)}
			{token ? <HomeContainer /> : <UnauthenticatedContainer />}
		</ThemeProvider>
	);
}

export default App;
