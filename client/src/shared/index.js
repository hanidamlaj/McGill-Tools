import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

/**
 * @typedef {Object} Link
 * @property {string} name the name of the link/button
 * @property {Object} icon a react element of the icon for button
 * @property {Function} handeClick callback function for when button/link is pressed
 */

export const IsSmallContext = React.createContext(false);

export const theme = createMuiTheme({
	typography: {
		fontFamily: ["Quicksand", "sans-serif"]
	},
	palette: {
		primary: { main: "#E24945" }
	}
});

console.log(theme);
