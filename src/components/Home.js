import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import FindASeatContainer from "../containers/find_a_seat/FindASeatContainer";
import NavigationDesktopContainer from "../containers/NavigationDesktopContainer";
import NavigationMobileContainer from "../containers/NavigationMobileContainer";

import { IsSmallContext } from "../shared";

import * as firebase from "firebase/app";
import "firebase/auth";
import SettingsContainer from "../containers/SettingsContainer";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		minHeight: "100vh",
		"& div": {
			boxSizing: "border-box"
		}
	},
	content: {
		// adjustments due to varying height in material appbar
		[theme.breakpoints.up("lg")]: {
			flexGrow: 1,
			padding: theme.spacing(6, 8)
		},

		[theme.breakpoints.down("md")]: {
			flexGrow: 1,
			padding: theme.spacing(10, 1)
		},

		"& > div": {
			marginBottom: theme.spacing(4)
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
	);
}

Home.propTypes = {};

export default Home;
