// @flow

import * as React from "react";

import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "@material-ui/icons/Menu";
import NotificationIcon from "@material-ui/icons/NotificationsActive";
import SettingsIcon from "@material-ui/icons/Settings";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import PaymentIcon from "@material-ui/icons/Payment";

const useStyles = makeStyles((theme) => ({
	// navigation bar styles
	root: {
		flexGrow: 1,
		paddingTop: theme.spacing(10),
	},
	appbar: {
		backgroundColor: "white",
		left: 0,
		right: 0,
	},
	toolbar: {
		position: "relative",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: theme.spacing(0, 2),
	},
	menuIcon: {
		position: "absolute",
		display: "block",
		left: theme.spacing(2),
	},
	logo: {
		color: "black",
		fontSize: 24,
		fontFamily: "Pacifico, cursive",
		textTransform: "uppercase",
	},
}));

type DrawerLinkProps = {
	buttonText: string,
	classes: { [string]: string },
	handleClick: () => void,
	icon: React.MixedElement,
	linkTo: string,
};

/**
 * renders an individual link inside the drawer
 */
function DrawerLink({
	buttonText,
	classes,
	handleClick,
	icon,
	linkTo,
}: DrawerLinkProps) {
	return (
		<Link
			color="inherit"
			className={classes.link}
			component={RouterLink}
			to={linkTo}
		>
			<ListItem button key={buttonText} onClick={handleClick}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primaryTypographyProps={{ variant: "button" }}>
					{buttonText}
				</ListItemText>
			</ListItem>
		</Link>
	);
}

type NavigationMobileProps = {
	logout: () => void,
};
/**
 * component for mobile top nagivation bar
 */
function NavigationMobile({ logout }: NavigationMobileProps) {
	const classes = useStyles();

	// links / menu options to display for navigation.
	const links = [
		{
			buttonText: "Find A Seat",
			icon: <NotificationIcon />,
			linkTo: "/",
		},
		{
			buttonText: "Settings",
			icon: <SettingsIcon />,
			linkTo: "/settings",
		},
		{ buttonText: "Donate", icon: <PaymentIcon />, linkTo: "/donate" },
	];

	/**
	 * state of the navigation bar for mobile
	 */
	const [navbarOpen, setNavbarOpen] = React.useState<boolean>(false);

	return (
		<div className={classes.root}>
			<AppBar className={classes.appbar} position="fixed">
				<Toolbar className={classes.toolbar}>
					<IconButton
						className={classes.menuIcon}
						onClick={() => setNavbarOpen(!navbarOpen)}
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.logo}>mcgill tools</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor="top"
				className={classes.drawer}
				open={navbarOpen}
				onClose={() => setNavbarOpen(false)}
			>
				<div className={classes.list}>
					<List>
						{links.map((link) => (
							<DrawerLink
								classes={classes}
								{...link}
								key={link.buttonText}
								handleClick={() => setNavbarOpen(false)}
							/>
						))}
						<Divider />
						<ListItem
							button
							onClick={() => {
								setNavbarOpen(false);
								logout();
							}}
						>
							<ListItemIcon>
								<SignOutIcon />
							</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{ color: "primary", variant: "button" }}
							>
								Sign Out
							</ListItemText>
						</ListItem>
					</List>
				</div>
			</Drawer>
		</div>
	);
}

export default NavigationMobile;
