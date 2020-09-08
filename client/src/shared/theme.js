import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	typography: {
		fontFamily: ["Quicksand", "sans-serif"]
	},
	palette: {
		primary: { main: "#E24945" },
		secondaryText: "eeeeee"
	}
});

export default theme;
