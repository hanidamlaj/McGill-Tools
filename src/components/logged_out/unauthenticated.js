import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import useMediaQuery from "@material-ui/core/useMediaQuery";
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
const useStylesDesktop = () =>
	makeStyles(theme => ({
		// dialog styles
		dialog: {
			padding: theme.spacing(4, 4)
		},
		continueWithProvider: {
			display: "block",
			width: "80%",
			minWidth: 170
		},
		separator: {
			position: "relative",
			width: "100%",
			margin: theme.spacing(1, 0),
			"&::after": {
				display: "block",
				content: '""',
				borderBottom: "1px #e5e5e5 solid",
				position: "absolute",
				top: "50%",
				left: 0,
				right: 0,
				transform: "translateY(-50%)"
			},
			"& > p": {
				textAlign: "center",
				"& > span": {
					display: "inline-block",
					position: "relative",
					zIndex: 1,
					backgroundColor: "white",
					padding: theme.spacing(0, 4)
				}
			}
		},
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
		},
		// body styles
		section: {
			display: "flex",
			justifyContent: "center",

			[theme.breakpoints.up("lg")]: {
				"&:nth-child(2)": {
					marginTop: theme.spacing(8)
				},
				// alternate background colours
				"&:nth-child(even)": {
					backgroundColor: "white"
				}
			},

			[theme.breakpoints.down("md")]: {
				"&:nth-child(2)": {
					marginTop: theme.spacing(10)
				},
				width: "100%",
				marginBottom: theme.spacing(4)
			}
		},
		sectionButton: {
			[theme.breakpoints.up("lg")]: {
				width: "40%"
			},

			[theme.breakpoints.down("md")]: {
				width: "100%"
			}
		},
		sectionContent: {
			display: "flex",
			// transform section title to uppercase letters
			"& h3": {
				textTransform: "uppercase",
				[theme.breakpoints.down("md")]: {
					fontSize: 22,
					textAlign: "center"
				}
			},

			[theme.breakpoints.up("lg")]: {
				maxWidth: 1800,
				padding: theme.spacing(8)
			},

			[theme.breakpoints.down("md")]: {
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "60%",
				maxWidth: 400,
				backgroundColor: "white",
				padding: theme.spacing(4),
				borderRadius: 25,
				boxShadow: [theme.shadows["8"]]
			}
		},
		sectionImageContainer: {
			[theme.breakpoints.down("md")]: {
				width: "100%"
			}
		},
		sectionImageOuter: {
			display: "flex",
			position: "relative",
			paddingTop: "71%"
		},
		sectionImage: {
			boxSizing: "border-box",
			position: "absolute",
			display: "block",
			left: "0px",
			top: "0px",
			width: "100%",
			height: "100%",
			padding: theme.spacing(4)
		},
		sectionText: {
			[theme.breakpoints.up("lg")]: {
				padding: theme.spacing(8, 0),
				"& > p": { fontSize: "24px" },
				color: "black"
			},

			[theme.breakpoints.down("md")]: {
				padding: theme.spacing(2, 0),
				"& > p": {
					fontSize: 16,
					color: "rgba(0, 0, 0, 0.6)",
					textAlign: "center"
				},
				color: "black"
			}
		}
	}));

function UnauthenticatedDesktop(props) {
	const classes = useStylesDesktop()();

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
	function handleGoogleAuth() {
		setContinueWithProvider(false);
		firebase
			.auth()
			.signInWithPopup(googleProvider)
			.then(result => {
				var token = result.credential.accessToken;
				var user = result.user;
				console.log(user, token);
			})
			.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				var email = error.email;
				var credential = error.credential;
				console.error(error);
			});
	}

	/**
	 * boolean flag to indicate if viewport matches small/medium device
	 * same as theme.breakpoints.down("md")
	 * @type {boolean}
	 */
	const smallDevice = useMediaQuery("(max-width:1279.95px)");

	/**
	 * array of tuples containing [buttonName, targetSectionId]
	 * @type {[string, string]}
	 */
	const menuButtons = [
		["find a seat", "find_a_seat"],
		["developers", "developers"],
		["join us", "join_us"]
	];

	/**
	 * @typedef {Object} Section a section (e.g. row/card) of the body
	 * @property {string} buttonText the button text
	 * @property {string} imgSrc the src attribute of img tag
	 * @property {string[]} sectionBodyText the paragraphs of the body
	 * @property {string} sectionId id attribute for section
	 * @property {string} sectionTitle the title of the section
	 */

	/**
	 * array of sections to render to the page
	 * @type {Section[]} sectionsData
	 */
	const sectionsData = [
		{
			buttonText: "Get Started",
			imgSrc: "/notification.svg",
			sectionBodyText: [
				"Are you tired of constantly refreshing Minerva to see if a seat has become available?",
				"If so, sign up to get notified immediately!"
			],
			sectionId: "find_a_seat",
			sectionTitle: "Find A Seat"
		},
		{
			buttonText: "Get Coding",
			imgSrc: "/developer.svg",
			sectionBodyText: [
				"Are you interested in building your own tools for the McGill community?",
				"Register now and obtain an access token to leverage our existing APIs such as querying course data!"
			],
			sectionId: "developers",
			sectionTitle: "Developers"
		},
		{
			buttonText: "Start Innovating",
			imgSrc: "/community.svg",
			sectionBodyText: [
				"If you’re interested in joining our mission to innovate for the community, we would love to hear from you!"
			],
			sectionId: "join_us",
			sectionTitle: "Join Us"
		}
	];

	// react element for the sections
	const sections = sectionsData.map((section, index) => {
		// half of the section that contains text
		const description = (
			<Grid item lg={6} xs={12}>
				<Typography className={classes.sectionTitle} variant="h3">
					{section.sectionTitle}
				</Typography>
				<div className={classes.sectionText}>
					{section.sectionBodyText.map(text => (
						<Typography gutterBottom key={text} variant="body1">
							{text}
						</Typography>
					))}
				</div>
				<Button
					className={classes.sectionButton}
					color="primary"
					onClick={handleGetStarted}
					variant="outlined"
				>
					{section.buttonText}
				</Button>
			</Grid>
		);

		// other half of section that contains the image
		const image = (
			<Grid className={classes.sectionImageContainer} item lg={6}>
				<div className={classes.sectionImageOuter}>
					<img className={classes.sectionImage} src={section.imgSrc} />
				</div>
			</Grid>
		);

		return (
			<div
				className={classes.section}
				id={section.sectionId}
				key={section.sectionId}
			>
				<div className={classes.sectionContent}>
					{smallDevice || index % 2 !== 0 ? (
						<React.Fragment>
							{image} {description}
						</React.Fragment>
					) : (
						<React.Fragment>
							{description} {image}
						</React.Fragment>
					)}
				</div>
			</div>
		);
	});

	return (
		<React.Fragment>
			{/* CONTINUE WITH PROVIDER DIALOG */}
			{continueWithProvider && (
				<Dialog
					fullWidth
					maxWidth="xs"
					open={continueWithProvider}
					onClose={handleDialogClose}
				>
					<DialogContent className={classes.dialog}>
						<Grid
							alignItems="center"
							container
							direction="column"
							justify="center"
						>
							<img
								className={classes.continueWithProvider}
								src="/btn_facebook.svg"
							/>
							<div className={classes.separator}>
								<p>
									<span>OR</span>
								</p>
							</div>
							<img
								className={classes.continueWithProvider}
								onClick={handleGoogleAuth}
								src="/btn_google.svg"
							/>
						</Grid>
					</DialogContent>
				</Dialog>
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

			{/* sections */}
			{sections}
		</React.Fragment>
	);
}

export default UnauthenticatedDesktop;
