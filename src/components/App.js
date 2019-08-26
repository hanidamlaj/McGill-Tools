import React from "react";
import { Route, Switch } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import red from "@material-ui/core/colors/red";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import HomeContainer from "../containers/HomeContainer";
import LoginContainer from "../containers/logged_out/LoginContainer";
import UnauthenticatedContainer from "../containers/logged_out/UnauthenticatedContainer";

import { theme, IsSmallContext } from "../shared";

const useStyles = makeStyles(theme => ({
	close: {
		color: "white",
		padding: theme.spacing(0.5)
	}
}));

function App({ token, loaders, snackbar, setSnackbar }) {
	/**
	 * boolean flag to indicate if viewport matches small/medium device
	 * same as theme.breakpoints.down("md")
	 * @type {boolean}
	 */
	const isSmallDevice = useMediaQuery("(max-width:1279.95px)");

	const classes = useStyles();
	const handleClose = () => {
		setSnackbar("");
	};

	return (
		<ThemeProvider theme={theme}>
			<IsSmallContext.Provider value={isSmallDevice}>
				{loaders.length > 0 && (
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							zIndex: 1200
						}}
					>
						<LinearProgress color="primary" />
					</div>
				)}
				{snackbar && (
					<Snackbar
						action={[
							<IconButton
								className={classes.close}
								color="primary"
								key="close"
								onClick={handleClose}
							>
								<CloseIcon />
							</IconButton>
						]}
						autoHideDuration={5000}
						anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
						message={
							<Typography
								variant="body2"
								style={{ color: red[500], fontWeight: 500 }}
							>
								{snackbar}
							</Typography>
						}
						onClose={handleClose}
						open={!!snackbar}
					/>
				)}
				{token ? (
					<HomeContainer />
				) : (
					<Switch>
						<Route exact path="/auth/:provider" component={LoginContainer} />
						<Route path="/" component={UnauthenticatedContainer} />
					</Switch>
				)}
			</IsSmallContext.Provider>
		</ThemeProvider>
	);
}

export default App;
