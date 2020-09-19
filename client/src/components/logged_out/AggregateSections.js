// @flow

import React from "react";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { IsSmallContext } from "../../shared";

import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
	// STYLES THAT APPLY ONLY FOR
	// LARGE VIEWPORTS
	section: {
		// alternate background colours
		"&:nth-child(even)": {
			backgroundColor: "white",
		},
	},
	sectionContent: {
		position: "relative",
		padding: theme.spacing(8),
	},
	flexOrderOne: {
		order: 0,
	},
	flexOrderTwo: {
		order: 1,
	},
	chipContainer: {
		position: "absolute",
		top: 16,
		right: 16,
		"& > div": {
			width: 200,
		},
	},

	// STYLES THAT ONLY APPLY TO
	// SMALL VIEWPORTS
	sectionCardRoot: {
		borderRadius: 25,
		padding: theme.spacing(4),
	},

	// SHARE STYLES THAT APPLY TO BOTH
	sectionButton: {
		[theme.breakpoints.up("lg")]: {
			width: "40%",
		},

		[theme.breakpoints.down("md")]: {
			width: "100%",
		},
	},
	sectionImageOuter: {
		display: "flex",
		position: "relative",
		paddingTop: "71%",
	},
	sectionImage: {
		boxSizing: "border-box",
		position: "absolute",
		display: "block",
		left: "0px",
		top: "0px",
		width: "100%",
		height: "100%",
		padding: theme.spacing(4),
	},

	sectionText: {
		[theme.breakpoints.up("lg")]: {
			padding: theme.spacing(8, 0),
			"& > p": { fontSize: "24px" },
		},

		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(2, 0),
			"& > p": {
				fontSize: 16,
			},
		},
	},
	hidden: {
		height: 1,
		visibility: "hidden",
	},
}));

type Section = {
	buttonText: string,
	imgSrc: string,
	sectionBodyText: Array<string>,
	sectionId: string,
	sectionTitle: string,
	comingSoon?: boolean,
};

const sectionsData: Array<Section> = [
	{
		buttonText: "Get Started",
		imgSrc: "/static/images/notification.svg",
		sectionBodyText: [
			"Are you tired of constantly refreshing Minerva to see if a seat has become available?",
			"If so, sign up to get notified immediately!",
		],
		sectionId: "find_a_seat",
		sectionTitle: "Find A Seat",
	},
	{
		buttonText: "Get Coding",
		comingSoon: true,
		imgSrc: "/static/images/developer.svg",
		sectionBodyText: [
			"Are you interested in building your own tools for the McGill community?",
			"Register now and obtain an access token to leverage our existing APIs such as querying course data!",
		],
		sectionId: "developers",
		sectionTitle: "Developers",
	},
	{
		buttonText: "Start Innovating",
		comingSoon: true,
		imgSrc: "/static/images/community.svg",
		sectionBodyText: [
			"If you’re interested in joining our mission to innovate for the community, we would love to hear from you!",
		],
		sectionId: "join_us",
		sectionTitle: "Join Us",
	},
];

type SingleSectionProps = {
	classes: { [string]: string },
	section: Section,
	index: number,
	handleClick: () => void,
};

function SingleSectionSmallViewport({
	classes,
	handleClick,
	index,
	section,
}: SingleSectionProps) {
	return (
		<Container
			maxWidth="xs"
			fixed
			id={section.sectionId}
			key={section.sectionId}
		>
			<Grid container justify="center">
				<Grid item xs={12}>
					<Box my={2}>
						<Card elevation={8} classes={{ root: classes.sectionCardRoot }}>
							<Grid container direction="column" alignItems="center">
								{section.comingSoon && (
									<Chip label="Coming Soon" variant="outlined" />
								)}

								<div style={{ width: "100%" }}>
									<div className={classes.sectionImageOuter}>
										<img
											alt=""
											className={classes.sectionImage}
											src={section.imgSrc}
										/>
									</div>
								</div>

								<Typography variant="h4">
									{section.sectionTitle.toUpperCase()}
								</Typography>

								<div className={classes.sectionText}>
									{section.sectionBodyText.map((text) => (
										<Typography
											align="center"
											color="textSecondary"
											gutterBottom
											key={text}
											variant="body1"
										>
											{text}
										</Typography>
									))}
								</div>

								<Button
									color="primary"
									onClick={handleClick}
									variant="outlined"
								>
									{section.buttonText}
								</Button>
							</Grid>
						</Card>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

/**
 * React component that returns a single section of the landing page
 */
function SingleSectionBigViewport({
	classes,
	handleClick,
	index,
	section,
}: SingleSectionProps) {
	return (
		<div
			className={classes.section}
			id={section.sectionId}
			key={section.sectionId}
		>
			<Container fixed maxWidth="lg">
				<Grid container className={classes.sectionContent}>
					{section.comingSoon && (
						<div className={classes.chipContainer}>
							<Chip label="Coming Soon" variant="outlined" />
						</div>
					)}

					{/* Section Description */}
					<Grid
						item
						lg={6}
						className={classnames({
							[classes.flexOrderOne]: index % 2 === 0,
							[classes.flexOrderTwo]: index % 2 !== 0,
						})}
					>
						<Typography variant="h3">
							{section.sectionTitle.toUpperCase()}
						</Typography>
						<div className={classes.sectionText}>
							{section.sectionBodyText.map((text) => (
								<Typography
									gutterBottom
									key={text}
									color="textSecondary"
									variant="body1"
								>
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

					{/* Section Image */}
					<Grid
						item
						lg={6}
						className={classnames({
							[classes.flexOrderOne]: index % 2 !== 0,
							[classes.flexOrderTwo]: index % 2 === 0,
						})}
					>
						<div className={classes.sectionImageOuter}>
							<img
								alt=""
								className={classes.sectionImage}
								src={section.imgSrc}
							/>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

type AggregateSectionsProps = {
	handleClick: () => void,
};

/**
 * React component that returns the aggregate of all sections
 */
function AggregateSections(props: AggregateSectionsProps) {
	const classes = useStyles();

	const isSmallDevice = React.useContext(IsSmallContext);

	return (
		<>
			{sectionsData.map((section, index) =>
				isSmallDevice ? (
					<SingleSectionSmallViewport
						{...props}
						classes={classes}
						index={index}
						key={section.sectionId}
						section={section}
					/>
				) : (
					<SingleSectionBigViewport
						{...props}
						classes={classes}
						index={index}
						key={section.sectionId}
						section={section}
					/>
				)
			)}
			{/* for bottom margin purposes */}
			<div className={classes.hidden} />
		</>
	);
}

export default AggregateSections;
