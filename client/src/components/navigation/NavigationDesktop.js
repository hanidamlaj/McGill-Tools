// @flow

import type { User } from "../../reducers/types.js";

import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import LogoutIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		// offset due to navigation bar
		paddingTop: theme.spacing(12),
	},
	appbar: {
		backgroundColor: "#333",
	},
	logo: {
		height: 64,
		"-moz-user-select": "none",
		"-webkit-user-select": "none",
		"user-select": "none",
		"-moz-user-drag": "none",
		"-webkit-user-drag": "none",
		"user-drag": "none",
	},
	title: {
		flexGrow: 1,
		textTransform: "uppercase",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	linksWrapper: {
		marginRight: theme.spacing(2),
	},
	link: {
		margin: theme.spacing(0, 1),
		"& span": {
			fontWeight: 700,
		},
	},
	linkIcon: {
		marginRight: theme.spacing(1),
	},
}));

/**
 * component that renders a button for a given link
 */
type ButtonLinkProps = {
	classes: { [string]: string },
	linkTo: string,
	buttonName: string,
};
function ButtonLink({ classes, linkTo, buttonName }: ButtonLinkProps) {
	return (
		<Link
			className={classes.link}
			component={RouterLink}
			to={linkTo}
			underline="none"
		>
			<Button color="primary">{buttonName}</Button>
		</Link>
	);
}

type NavigationDesktopProps = {
	logout: () => void,
	user: User,
	match: Object,
	history: Object,
};
function NavigationDesktop({
	logout,
	user,
	match,
	history,
	...props
}: NavigationDesktopProps) {
	const classes = useStyles();

	// component state for authenticated user
	const [authenticatedUser, setAuthenticatedUser] = useState<User>(user);

	// component state for the anchor element
	const [anchorEl, setAnchorEl] = React.useState(null);

	// control whether menu is open
	const open = Boolean(anchorEl);

	useEffect(() => {
		if (user) setAuthenticatedUser(user);
	}, [user]);

	// callback to open the user menu
	const handleMenu = (event: Event) => {
		setAnchorEl(event.currentTarget);
	};

	// callback to close the user menu
	const handleClose = () => {
		setAnchorEl(null);
	};

	// callback to handle when links are clicked
	const handleSettings = () => {
		handleClose();
		history.push("/settings");
	};

	// callback to handle user logout
	const handleLogout = () => {
		handleClose();
		logout();
		history.push("/");
	};

	const links = [
		{
			buttonName: "Get A Seat",
			linkTo: "/",
		},
		{
			buttonName: "api",
			linkTo: "/capi",
		},
		{ 
			buttonName: "donate", 
			linkTo: "/donate" 
		},
		{
			buttonName: "schedule builder",
			linkTo: "/"
		}
	];

	// extract user parameters for tooltip message
	const { displayName, email, phoneNumber } = user;

	// construct tooltip message to display profile overview
	const tooltipMsg = (
		<Typography align="center">
			{`${displayName}`}
			<br />
			{`${email}`}
			<br />
			{`${phoneNumber}`}
		</Typography>
	);

	return (
		<div className={classes.root}>
			<AppBar className={classes.appbar} position="fixed">
				<Toolbar>
					{/* mcgill_tools logo */}
					<img
						alt="logo"
						className={classes.logo}
						src="/static/images/logo.png"
					></img>

					{/* header for the current url/path */}
					<Typography className={classes.title} variant="h6">
						{match.params.path ? match.params.path.split("-").join(" ") : ""}
					</Typography>

					{/* contains the avatar, links, and menu items */}
					<div>
						<span className={classes.linksWrapper}>
							{links.map((link) => (
								<ButtonLink classes={classes} {...link} key={link.linkTo} />
							))}
						</span>

						<Tooltip title={tooltipMsg} placement="bottom">
							<IconButton onClick={handleMenu} color="inherit">
								<Avatar
									alt={authenticatedUser.displayName}
									src={authenticatedUser.photoURL}
								></Avatar>
							</IconButton>
						</Tooltip>

						{open && (
							<Popover
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={handleSettings}>
									<SettingsIcon className={classes.linkIcon} />
									SETTINGS
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<LogoutIcon className={classes.linkIcon} />
									LOG OUT
								</MenuItem>
							</Popover>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default NavigationDesktop;
