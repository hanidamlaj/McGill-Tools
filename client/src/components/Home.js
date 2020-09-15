// @flow

import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import FindASeatContainer from "../containers/find_a_seat/FindASeatContainer";
import NavigationDesktopContainer from "../containers/NavigationDesktopContainer";
import NavigationMobileContainer from "../containers/NavigationMobileContainer";
import SettingsContainer from "../containers/SettingsContainer";
import APIContainer from "../containers/api/APIContainer";
import Donate from "./Donate";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { IsSmallContext } from "../shared";

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

type Props = {
	logout: () => void,
};

function Home({ logout }: Props) {
	const classes = useStyles();
	const isSmallDevice = React.useContext(IsSmallContext);

	// equivalent to componentDidUnmount() lifecycle function -- sign user out from firebase
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
					// This allows the navigation component to read the path and display in nav bar.
					<Route path="/:path?" component={NavigationDesktopContainer}></Route>
				)}

				<Container fixed>
					<div className={classes.content}>
						<Switch>
							{/* Handle redirect after user has been authenticated. */}
							<Route
								exact
								path="/auth/:provider"
								render={() => <Redirect to="/" />}
							/>

							{/* Route for settings page. */}
							<Route exact path="/settings" component={SettingsContainer} />

							{/* Route for api page. */}
							<Route exact path="/capi" component={APIContainer} />

							{/* Route for subscribing to courses. */}
							<Route exact path="/get-a-seat" component={FindASeatContainer} />

							{/* Route for donations */}
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
