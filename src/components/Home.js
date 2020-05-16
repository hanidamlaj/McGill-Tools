import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import FindASeatContainer from "../containers/find_a_seat/FindASeatContainer";
import NavigationDesktopContainer from "../containers/NavigationDesktopContainer";
import NavigationMobileContainer from "../containers/NavigationMobileContainer";
import SettingsContainer from "../containers/SettingsContainer";
import APIContainer from "../containers/APIContainer";
import Donate from "./Donate";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { IsSmallContext } from "../shared";

import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	rootWrapper: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	},
	root: {
		flexGrow: 1,
		flexDirection: "row",
		display: "flex",
	},
	content: {
		flexGrow: 1,
		"& > div": {
			marginBottom: theme.spacing(4),
		},
	},
	footerText: {
		padding: theme.spacing(2, 2),
	},
}));

function Home({ logout }) {
	const classes = useStyles();
	const isSmallDevice = React.useContext(IsSmallContext);

	// componentDidUnmount() -- sign out from firebase user
	// TODO: implement this in the action rather than here
	useEffect(() => {
		return () => {
			// sign user out and clear local storage
			logout();
		};
	}, []);

	return (
		<div className={classes.rootWrapper}>
			<div>
				{isSmallDevice ? (
					<NavigationMobileContainer />
				) : (
					// this allows the navigation component to read the path and display in nav bar
					<Route path="/:path?" component={NavigationDesktopContainer}></Route>
				)}

				<Container fixed>
					<div className={classes.content}>
						<Switch>
							{/* handle redirect after user has been authenticated */}
							<Route
								exact
								path="/auth/:provider"
								render={() => <Redirect to="/" />}
							/>

							{/* route for settings page */}
							<Route exact path="/settings" component={SettingsContainer} />

							{/* route for api page */}
							<Route exact path="/capi" component={APIContainer} />

							{/* root route displays find_a_seat */}
							<Route exact path="/get-a-seat" component={FindASeatContainer} />

							<Route exact path="/donate" component={Donate} />

							{/* default route (no routes matched, redirect to home) */}
							<Route path="/" render={() => <Redirect to="/get-a-seat" />} />
						</Switch>
					</div>
				</Container>
			</div>
			<Grid container>
				<Grid item xs={12}>
					<Divider variant="fullWidth"></Divider>
				</Grid>
				<Grid item xs={12} className={classes.footerText}>
					<Typography align="center" variant="body2">
						<Link
							href="https://mail.google.com/mail/?view=cm&fs=1&to=hanidamlaj@gmail.com"
							target="_blank"
						>
							© 2020 McGill Tools | Hani Damlaj
						</Link>
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
}

Home.propTypes = {};

export default Home;
