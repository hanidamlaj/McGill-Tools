import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import FindASeatContainer from "../containers/findASeatContainer";
import NavigationDesktopContainer from "../containers/navigationDesktopContainer";
import NavigationMobileContainer from "../containers/navigationMobileContainer";

import { IsSmallContext } from "../shared";

import * as firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "flex-end",
		minHeight: "100vh",
		"& div": {
			boxSizing: "border-box"
		}
	},
	content: {
		// adjustments due to varying height in material appbar

		[theme.breakpoints.up("lg")]: {
			width: "calc(100vw - 300px)",
			padding: theme.spacing(8, 8)
		},

		[theme.breakpoints.down("md")]: {
			flexGrow: 1,
			padding: theme.spacing(10, 2)
		}
	}
}));

function Home() {
	const classes = useStyles();
	const isSmallDevice = React.useContext(IsSmallContext);

	// componentDidUnmout() -- sign out from firebase user
	// TODO: implement this in the action rather than here
	useEffect(() => {
		return () => {
			firebase.auth().signOut();
		};
	}, []);

	return (
		// <Grid className={classes.root} container justify="flex-end">
		<div className={classes.root}>
			{isSmallDevice ? (
				<NavigationMobileContainer />
			) : (
				<NavigationDesktopContainer />
			)}
			<div className={classes.content}>
				<Switch>
					{/* handle redirect after user has been authenticated */}
					<Route exact path="/login" render={() => <Redirect to="/" />} />
					<Route path="/" component={FindASeatContainer} />
				</Switch>
			</div>
		</div>
		// </Grid>
	);
}

Home.propTypes = {};

export default Home;
