import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import AggregateSections from "./AggregateSections";
import ContinueWithDialog from "./ContinueWithDialog";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCT2qv1HiWP5J9ixp3sDr3mmDumgEL4is4",
	authDomain: "mcgill-tools.firebaseapp.com",
	databaseURL: "https://mcgill-tools.firebaseio.com",
	projectId: "mcgill-tools",
	storageBucket: "mcgill-tools.appspot.com",
	messagingSenderId: "698871000166",
	appId: "1:698871000166:web:8d0b16ed5da49987"
};

firebase.initializeApp(firebaseConfig);

// lazy load desktop styles
const useStyles = makeStyles(theme => ({
	// navigation bar styles
	appbar: {
		backgroundColor: "white",
		left: 0,
		right: 0
	},
	toolbar: {
		position: "relative",
		display: "flex",
		alignItems: "center",

		[theme.breakpoints.up("lg")]: {
			padding: theme.spacing(0, 8),
			justifyContent: "end"
		},

		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(0, 2),
			justifyContent: "center"
		}
	},
	menuIcon: {
		[theme.breakpoints.up("lg")]: {
			display: "none"
		},

		[theme.breakpoints.down("md")]: {
			display: "block",
			position: "absolute",
			left: theme.spacing(2)
		}
	},
	logo: {
		fontSize: 24,
		fontFamily: "Pacifico, cursive",
		textTransform: "uppercase",
		color: "black"
	},
	links: {
		[theme.breakpoints.up("lg")]: {
			display: "flex",
			justifyContent: "flex-end",
			padding: theme.spacing(0, 4),
			flex: 1,
			"& > button": {
				marginRight: 32
			}
		},

		[theme.breakpoints.down("md")]: {
			display: "none"
		}
	},
	signUp: {
		[theme.breakpoints.down("md")]: {
			display: "none"
		}
	}
}));

function Unauthenticated({ login }) {
	const classes = useStyles();

	/**
	 * controls the state of the modal that allows user to continue with preferred provider
	 * @type {[boolean, function]}
	 */
	const [continueWithProvider, setContinueWithProvider] = useState(false);

	// handles clicks to get users started
	function handleGetStarted() {
		setContinueWithProvider(true);
	}

	// handles closing dialogs when user clicks away
	function handleDialogClose() {
		setContinueWithProvider(false);
	}

	/**
	 * firebase authentication providers (Google and Facebook)
	 */
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	const facebookProvider = new firebase.auth.FacebookAuthProvider();
	facebookProvider.addScope("email");

	/**
	 * handle authentication with specified providers
	 */
	function handleGoogleAuth() {
		setContinueWithProvider(false);
		firebase
			.auth()
			.signInWithPopup(googleProvider)
			.then(async result => {
				// var user = result.user;
				const idToken = await firebase.auth().currentUser.getIdToken(true);
				login(idToken);
			})
			.catch(function(error) {
				console.error(error);
			});
	}

	function handleFacebookAuth() {
		setContinueWithProvider(false);
		firebase
			.auth()
			.signInWithPopup(facebookProvider)
			.then(async result => {
				// var user = result.user;
				const idToken = await firebase.auth().currentUser.getIdToken(true);
				login(idToken);
			})
			.catch(function(error) {
				console.error(error);
			});
	}

	/**
	 * array of tuples containing [buttonName, targetSectionId]
	 * @type {[string, string]}
	 */
	const menuButtons = [
		["find a seat", "find_a_seat"],
		["developers", "developers"],
		["join us", "join_us"]
	];

	return (
		<React.Fragment>
			{/* CONTINUE WITH PROVIDER DIALOG */}
			{continueWithProvider && (
				<ContinueWithDialog
					fullWidth
					handleFacebookAuth={handleFacebookAuth}
					handleGoogleAuth={handleGoogleAuth}
					maxWidth="xs"
					onClose={handleDialogClose}
					open={continueWithProvider}
				/>
			)}

			{/* NAVIGATION BAR */}
			<div>
				<AppBar className={classes.appbar} position="fixed">
					<Toolbar className={classes.toolbar}>
						<IconButton className={classes.menuIcon}>
							<MenuIcon />
						</IconButton>
						<Typography className={classes.logo}>mcgill tools</Typography>
						<div className={classes.links}>
							{menuButtons.map(arr => (
								<Button
									className={classes.menuButton}
									key={arr[1]}
									onClick={() =>
										document.getElementById(arr[1]).scrollIntoView()
									}
								>
									{arr[0]}
								</Button>
							))}
						</div>
						<div className={classes.signUp}>
							<Button
								color="primary"
								onClick={handleGetStarted}
								variant="outlined"
							>
								Sign up
							</Button>
						</div>
					</Toolbar>
				</AppBar>
			</div>

			{/* SECTIONS */}
			<AggregateSections handleClick={handleGetStarted} />
		</React.Fragment>
	);
}

export default Unauthenticated;
