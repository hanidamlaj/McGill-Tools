import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Grid,
	Button,
	IconButton
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

// lazy load desktop styles
const useStylesDesktop = () =>
	makeStyles(theme => ({
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
		}
	}));

function UnauthenticatedDesktop(props) {
	const classes = useStylesDesktop()();

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
	 * @typedef {Object} Section
	 * @property {string} buttonText the button text
	 * @property {string} imgSrc the src attribute of img tag
	 * @property {string[]} sectionBodyText the paragraphs of the body
	 * @property {string} sectionId id attribute for section
	 * @property {string} sectionTitle the title of the section
	 */

	/**
	 * array of sections
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

	// react element containing the sections of the page
	const sections = sectionsData.map((section, index) => {
		// half of the section that contains text
		const description = (
			<Grid item xs={12} lg={6}>
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
					variant="outlined"
				>
					{section.buttonText}
				</Button>
			</Grid>
		);

		// other half of section that contains the image
		const image = (
			// <div className={classes.sectionImageContainer}>
			// 	<div className={classes.sectionImageOuter}>
			// 		<img src={section.imgSrc} className={classes.sectionImage} />
			// 	</div>
			// </div>
			<Grid item lg={6} className={classes.sectionImageContainer}>
				<div className={classes.sectionImageOuter}>
					<img src={section.imgSrc} className={classes.sectionImage} />
				</div>
			</Grid>
		);

		return (
			<div
				className={classes.section}
				key={section.sectionId}
				id={section.sectionId}
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
			{/* NAVIGATION BAR */}
			<div>
				<AppBar position="fixed" className={classes.appbar}>
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
							<Button variant="outlined">Sign up</Button>
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
