// @flow
import React from "react";
import { Route, Switch } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import red from "@material-ui/core/colors/red";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
import { ThemeProvider } from "@material-ui/core/styles/";

import HomeContainer from "../containers/HomeContainer";
import LoginContainer from "../containers/logged_out/LoginContainer";
import UnauthenticatedContainer from "../containers/logged_out/UnauthenticatedContainer";

import { theme, IsSmallContext } from "../shared";

const useStyles = makeStyles((theme) => ({
	close: {
		color: "white",
	},
	snackbarContentRoot: {
		flexWrap: "nowrap",
	},
}));

type Props = {
	token: string,
	loaders: Array<string>,
	snackbar: { success: string, error: string },
	setSnackbar: (string) => void,
	setSnackbarError: (string) => void,
};

function App({
	token,
	loaders,
	snackbar: { success, error },
	setSnackbar,
	setSnackbarError,
}: Props) {
	/**
	 * Boolean flag to indicate if viewport matches small/medium device.
	 * Equivalent to theme.breakpoints.down("md").
	 */
	const isSmallDevice: boolean = useMediaQuery("(max-width:1279.95px)");

	const classes = useStyles();

	const handleClose = () => {
		setSnackbar("");
		setSnackbarError("");
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
							zIndex: 1200,
						}}
					>
						<LinearProgress color="primary" />
					</div>
				)}
				{(!!success || !!error) && (
					<Snackbar
						autoHideDuration={5000}
						anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
						onClose={handleClose}
						open={!!success || !!error}
					>
						<SnackbarContent
							classes={{
								root: classes.snackbarContentRoot,
							}}
							action={[
								<IconButton
									className={classes.close}
									color="primary"
									key="close"
									onClick={handleClose}
								>
									<CloseIcon />
								</IconButton>,
							]}
							message={
								<Typography
									variant="body2"
									style={{
										color: error ? red[500] : "#28a745",
										fontWeight: 500,
										textAlign: "center",
									}}
								>
									{success || error}
								</Typography>
							}
						></SnackbarContent>
					</Snackbar>
				)}
				{/* Presence of token can be taken as user is authenticated. TODO: can be improved. */}
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
