import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./shared/theme";
import UnauthenticatedContainer from "./containers/logged_out/UnauthenticatedContainer";

function app(props) {
	return (
		<ThemeProvider theme={theme}>
			<UnauthenticatedContainer />
		</ThemeProvider>
	);
}

export default app;
