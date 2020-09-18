import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	spacing: 8,
	typography: {
		fontFamily: ["Quicksand", "sans-serif"],
	},
	palette: {
		primary: { main: "#E24945" },
		secondaryText: "eeeeee",
	},
});

export default theme;
