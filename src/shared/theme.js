import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	typography: {
		fontFamily: ["Quicksand", "sans-serif"]
	},
	palette: {
		primary: { main: "#E24945" }
	}
});

console.log(theme);

export default theme;
