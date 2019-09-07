import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import FindASeatContainer from "../containers/find_a_seat/FindASeatContainer";
import NavigationDesktopContainer from "../containers/NavigationDesktopContainer";
import NavigationMobileContainer from "../containers/NavigationMobileContainer";
import SettingsContainer from "../containers/SettingsContainer";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { IsSmallContext } from "../shared";

import * as firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles(theme => ({
	rootWrapper: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh"
	},
	root: {
		flexGrow: 1,
		display: "flex"
	},
	content: {
		// adjustments due to varying height in material appbar
		[theme.breakpoints.up("lg")]: {
			flexGrow: 1,
			padding: theme.spacing(6, 8)
		},

		[theme.breakpoints.down("md")]: {
			flexGrow: 1,
			marginTop: theme.spacing(8),
			padding: theme.spacing(2, 1)
		},

		"& > div": {
			marginBottom: theme.spacing(4)
		}
	},
	footer: {
		// flexGrow: 0,
		[theme.breakpoints.up("lg")]: {
			width: "calc(100% - 250px)"
		}
	},
	footerText: {
		padding: theme.spacing(2, 2),
		"& > p": {
			margin: theme.spacing(0, 1)
		}
	}
}));

function Home() {
	const classes = useStyles();
	const isSmallDevice = React.useContext(IsSmallContext);

	// componentDidUnmount() -- sign out from firebase user
	// TODO: implement this in the action rather than here
	useEffect(() => {
		return () => {
			// sign user out and clear local storage
			firebase.auth().signOut();
			localStorage.clear();
		};
	}, []);

	return (
		<div className={classes.rootWrapper}>
			<div className={classes.root}>
				{isSmallDevice ? (
					<NavigationMobileContainer />
				) : (
					<NavigationDesktopContainer />
				)}
				<div className={classes.content}>
					<Switch>
						{/* handle redirect after user has been authenticated */}
						<Route
							exact
							path="/auth/:provider"
							render={() => <Redirect to="/" />}
						/>
						<Route exact path="/settings" component={SettingsContainer} />
						<Route path="/" component={FindASeatContainer} />
					</Switch>
				</div>
			</div>
			<Grid container justify="flex-end">
				<Grid container className={classes.footer}>
					<Grid item xs={12}>
						<Divider variant="fullWidth"></Divider>
					</Grid>
					<Grid item xs={12} className={classes.footerText}>
						<Typography align="center" variant="body2">
							<Link
								href="https://mail.google.com/mail/?view=cm&fs=1&to=mcgilltools@gmail.com"
								target="_blank"
							>
								© 2019 McGill Tools
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

Home.propTypes = {};

export default Home;
