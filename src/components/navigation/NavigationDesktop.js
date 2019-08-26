import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import CodeIcon from "@material-ui/icons/Code";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import NotificationIcon from "@material-ui/icons/NotificationsActive";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles(theme => ({
	sidebarContainer: {
		flexBasis: 250
	},
	sidebar: {
		display: "flex",
		position: "fixed",
		alignItems: "center",
		backgroundColor: "#333333",
		boxShadow: theme.shadows["4"],
		flexDirection: "column",
		height: "100vh",
		left: 0,
		padding: theme.spacing(2, 0),
		top: 0,
		width: 250
	},
	logo: {
		color: "white",
		fontFamily: "Pacifico, cursive",
		fontSize: 24,
		textTransform: "uppercase"
	},
	profile: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		width: "100%",
		padding: theme.spacing(4, 4)
	},
	profileImageContainer: {
		paddingTop: "80%",
		position: "relative",
		width: "80%"
	},
	profileImage: {
		borderRadius: "50%",
		display: "block",
		height: "100%",
		left: 0,
		position: "absolute",
		top: 0,
		width: "100%"
	},
	profileInformation: {
		padding: theme.spacing(2, 0),
		color: "white",
		"& > p": {
			color: "#c4c4c4"
		}
	},
	links: {
		color: "white",
		display: "flex",
		flexDirection: "column",
		width: "100%"
	},
	linkContainer: {
		position: "relative",
		width: "100%"
	},
	link: {
		"&:hover": {
			textDecoration: "none"
		}
	},
	linkIcon: {
		position: "absolute",
		left: 32,
		top: "50%",
		transform: "translateY(-50%)"
	},
	linkButton: {
		color: "white",
		fontSize: 18,
		padding: theme.spacing(1, 0)
	},
	linkButtonLabel: {
		paddingLeft: 80,
		justifyContent: "flex-start"
	}
}));

/**
 * @typedef {Object} Link
 * @property {Object} icon a react element of the icon for button
 * @property {string} linkTo the URL to send user to
 * @property {string} name the name of the link/button
 */

/**
 * component that renders a button for a given link
 */
function renderLink({ classes, linkTo, buttonText }) {
	return (
		<Link className={classes.link} component={RouterLink} to={linkTo}>
			<Button
				classes={{ label: classes.linkButtonLabel }}
				className={classes.linkButton}
				color="primary"
				fullWidth
			>
				{buttonText}
			</Button>
		</Link>
	);
}

function NavigationDesktop({ logout, user }) {
	const classes = useStyles();

	const [authenticatedUser, setAuthenticatedUser] = useState(user);
	useEffect(() => {
		setAuthenticatedUser(user);
	}, [user]);

	/**
	 * @type {Link[]} defined links
	 */
	const links = [
		{
			name: "Find A Seat",
			icon: <NotificationIcon className={classes.linkIcon} />,
			linkTo: "/"
		},
		{
			name: "Develop",
			icon: <CodeIcon className={classes.linkIcon} />,
			linkTo: "/develop"
		},
		{
			name: "Join Us",
			icon: <PeopleIcon className={classes.linkIcon} />,
			linkTo: "/join"
		},
		{
			name: "Settings",
			icon: <SettingsIcon className={classes.linkIcon} />,
			linkTo: "/settings"
		}
	];

	return (
		<div className={classes.sidebarContainer}>
			<div className={classes.sidebar}>
				{/* logo */}
				<Typography className={classes.logo}>McGill Tools</Typography>

				{/* profile section */}
				<div className={classes.profile}>
					<div className={classes.profileImageContainer}>
						<img
							alt=""
							className={classes.profileImage}
							src={`${authenticatedUser.photoURL}?type=large`}
						/>
					</div>
					<div className={classes.profileInformation}>
						<Typography align="center" variant="h5">
							{authenticatedUser.displayName}
						</Typography>
						<Typography align="center" gutterBottom variant="body1">
							{authenticatedUser.email}
						</Typography>
					</div>
				</div>

				{/* links section */}
				<div className={classes.links}>
					{links.map(link => (
						<div className={classes.linkContainer} key={link.name}>
							{link.icon}
							{renderLink({
								classes,
								linkTo: link.linkTo,
								buttonText: link.name
							})}
						</div>
					))}

					{/* logout button handled separately due to non-link behaviour */}
					<div className={classes.linkContainer}>
						<LogoutIcon className={classes.linkIcon} />
						<Button
							classes={{ label: classes.linkButtonLabel }}
							className={classes.linkButton}
							color="primary"
							fullWidth
							onClick={logout}
						>
							Log Out
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

NavigationDesktop.propTypes = {
	logout: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};

export default NavigationDesktop;
