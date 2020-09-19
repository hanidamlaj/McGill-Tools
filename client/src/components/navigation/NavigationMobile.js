// @flow

import * as React from "react";

import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
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

// links / menu options to display for navigation.
const LINKS = [
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

type NavigationMobileProps = {
	logout: () => void,
};

/**
 * component for mobile top nagivation bar
 */
function NavigationMobile({ logout }: NavigationMobileProps) {
	const classes = useStyles();

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

				<Collapse in={navbarOpen}>
					<Divider />
					<List>
						{LINKS.map((link) => (
							<Link key={link.linkTo} component={RouterLink} to={link.linkTo}>
								<ListItem
									button
									onClick={() => {
										setNavbarOpen(false);
									}}
								>
									<ListItemIcon>{link.icon}</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{
											color: "textPrimary",
											variant: "button",
										}}
									>
										{link.buttonText}
									</ListItemText>
								</ListItem>
							</Link>
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
				</Collapse>
			</AppBar>
		</div>
	);
}

export default NavigationMobile;
