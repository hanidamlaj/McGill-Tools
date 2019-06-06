import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import NotificationIcon from "@material-ui/icons/NotificationsActive";
import CodeIcon from "@material-ui/icons/Code";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: "100vh",
		"& div": {
			boxSizing: "border-box"
		}
	},
	sideBar: {
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
		width: "25%",
		[theme.breakpoints.up("xl")]: {
			width: 300
		}
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
	link: {
		// padding: theme.spacing(1, 0),
		position: "relative",
		width: "100%"
	},
	linkButton: {
		color: "white",
		fontSize: 18,
		padding: theme.spacing(1, 0),
		"& > span": {
			paddingLeft: 80,
			justifyContent: "flex-start"
		}
	},
	linkIcon: {
		// display: "block",
		position: "absolute",
		left: 32,
		top: "50%",
		transform: "translateY(-50%)"
	},
	content: {
		width: "75%",
		[theme.breakpoints.up("xl")]: {
			width: "calc(100vw - 300px)"
		}
	}
}));

/**
 * @typedef {Object} Link
 * @property {string} name the name of the link/button
 * @property {Object} icon a react element of the icon for button
 */

function Home({ user }) {
	const classes = useStyles();
	/**
	 * @type {Link[]} defined links
	 */
	const links = [
		{
			name: "Find A Seat",
			icon: <NotificationIcon className={classes.linkIcon} />
		},
		{ name: "Develop", icon: <CodeIcon className={classes.linkIcon} /> },
		{ name: "Join Us", icon: <PeopleIcon className={classes.linkIcon} /> },
		{ name: "Settings", icon: <SettingsIcon className={classes.linkIcon} /> },
		{ name: "Log Out", icon: <LogoutIcon className={classes.linkIcon} /> }
	];

	// const [authenticatedUser, setAuthenticatedUser] = useState(
	// 	user || { displayName: "", email: "", photoURL: "/avatar.png", phoneNumber: "" }
	// );
	// useEffect(() => {
	// 	setAuthenticatedUser(user);
	// }, [user]);

	return (
		<Grid className={classes.root} container justify="flex-end">
			<div className={classes.sideBar}>
				{/* logo */}
				<Typography className={classes.logo}>McGill Tools</Typography>

				{/* profile section */}
				<div className={classes.profile}>
					<div className={classes.profileImageContainer}>
						{/* <img className={classes.profileImage} src={"/avatar.png"} /> */}
						<img
							className={classes.profileImage}
							src={`${user.photoURL}?type=large`}
						/>
					</div>
					<div className={classes.profileInformation}>
						<Typography align="center" variant="h4">
							{user.displayName}
						</Typography>
						<Typography align="center" gutterBottom variant="body1">
							{user.email}
						</Typography>
					</div>
				</div>

				{/* links section */}
				<div className={classes.links}>
					{links.map(link => (
						<div className={classes.link} key={link.name}>
							{link.icon}
							<Button className={classes.linkButton} color="primary" fullWidth>
								{link.name}
							</Button>
						</div>
					))}
				</div>
			</div>
			<div className={classes.content}>
				<div>hello</div>
			</div>
		</Grid>
	);
}

Home.propType = {
	user: PropTypes.object.isRequired
};

export default Home;
