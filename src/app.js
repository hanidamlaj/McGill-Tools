import React from "react";
import Unauthenticated from "./components/logged_out/unauthenticated";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./shared/theme";

function app(props) {
	return (
		<ThemeProvider theme={theme}>
			<Unauthenticated />
		</ThemeProvider>
	);
}

export default app;
