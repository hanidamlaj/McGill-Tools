import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
 * @type {Array<Section>} sectionsData
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

/**
 * React component that returns a single section of the landing page
 * @param {Section} section
 * @param {number} index
 * @param {boolean} smallDevice
 */
function SingleSection({ classes, index, section, handleClick }) {
	/**
	 * boolean flag to indicate if viewport matches small/medium device
	 * same as theme.breakpoints.down("md")
	 * @type {boolean}
	 */
	const smallDevice = useMediaQuery("(max-width:1279.95px)");

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
				onClick={handleClick}
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
				<img alt="" className={classes.sectionImage} src={section.imgSrc} />
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
}

SingleSection.propTypes = {
	classes: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	section: PropTypes.object.isRequired,
	handleClick: PropTypes.func.isRequired
};

/**
 * React component that returns the aggregate of all sections
 */
function AggregateSections({ handleClick }) {
	const classes = useStyles();

	// react element for the sections
	return sectionsData.map((section, index) => (
		<SingleSection
			classes={classes}
			handleClick={handleClick}
			index={index}
			key={section.sectionId}
			section={section}
		/>
	));
}

AggregateSections.propTypes = {
	handleClick: PropTypes.func.isRequired
};

export default AggregateSections;
