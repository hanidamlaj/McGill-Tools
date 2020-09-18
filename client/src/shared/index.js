// @flow
import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

// Is the user viewing from a small width device.
export const IsSmallContext = React.createContext<boolean>(false);

export const theme = createMuiTheme({
	typography: {
		fontFamily: ["Quicksand", "sans-serif"],
	},
	palette: {
		primary: { main: "#E24945" },
	},
});
