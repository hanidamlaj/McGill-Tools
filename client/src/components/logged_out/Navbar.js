// @flow

import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import CodeIcon from "@material-ui/icons/Code";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationIcon from "@material-ui/icons/NotificationsActive";
import PeopleIcon from "@material-ui/icons/People";
import SignInIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles((theme) => ({
	// navigation bar styles
	appbar: {
		backgroundColor: "white",
		left: 0,
		right: 0,
	},
	toolbar: {
		position: "relative",
		display: "flex",
		alignItems: "center",

		[theme.breakpoints.up("lg")]: {
			padding: theme.spacing(0, 8),
			justifyContent: "end",
		},

		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(0, 2),
			justifyContent: "center",
		},
	},
	menuIcon: {
		display: "block",
		position: "absolute",
		left: theme.spacing(2),
	},
	logo: {
		fontSize: 24,
		fontFamily: "Pacifico, cursive",
		textTransform: "uppercase",
		color: "black",
	},
	links: {
		display: "flex",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 4),
		flex: 1,
		"& > button": {
			marginRight: 32,
		},
	},
}));

/**
 * array of tuples containing [buttonName, targetSectionId, icon]
 */
const MENU_BUTTONS: Array<[string, string, React.MixedElement]> = [
	["find a seat", "find_a_seat", <NotificationIcon />],
	["developers", "developers", <CodeIcon />],
	["join us", "join_us", <PeopleIcon />],
];

function useNavbarHook() {
	/**
	 * the id of the dom element to scroll to
	 * due to the limitations of scrolling when mobile drawer is open
	 */
	const [scrollIntoView, setScrollIntoView] = React.useState<string>("");

	React.useEffect(() => {
		if (scrollIntoView) {
			// optional chaining not supported by flow
			// document
			// 	.getElementById(scrollIntoView)
			// 	?.scrollIntoView({ behavior: "smooth", block: "center" });

			const el = document.getElementById(scrollIntoView);
			if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [scrollIntoView]);

	return [setScrollIntoView];
}

type AppbarProps = {
	handleGetStarted: () => void,
};

export function SmallViewAppbar({ handleGetStarted }: AppbarProps) {
	const classes = useStyles();

	const [setScrollIntoView] = useNavbarHook();

	/**
	 * state of the navigation bar for mobile
	 * @type {[boolean], Function}
	 */
	const [navbarOpen, setNavbarOpen] = React.useState<boolean>(false);

	return (
		<>
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
						{MENU_BUTTONS.map((item) => (
							<ListItem
								button
								key={item[1]}
								onClick={() => {
									setNavbarOpen(false);
									setScrollIntoView(item[1]);
								}}
							>
								<ListItemIcon>{item[2]}</ListItemIcon>
								<ListItemText
									primaryTypographyProps={{
										color: "textPrimary",
										variant: "button",
									}}
								>
									{item[0]}
								</ListItemText>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						<ListItem
							button
							onClick={() => {
								setNavbarOpen(false);
								handleGetStarted();
							}}
						>
							<ListItemIcon>
								<SignInIcon />
							</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{
									color: "textPrimary",
									variant: "button",
								}}
							>
								Sign In
							</ListItemText>
						</ListItem>
					</List>
				</Collapse>
			</AppBar>
		</>
	);
}

export function BigViewAppbar({ handleGetStarted }: AppbarProps) {
	const classes = useStyles();

	const [setScrollIntoView] = useNavbarHook();

	return (
		<>
			<AppBar className={classes.appbar} position="fixed">
				<Toolbar className={classes.toolbar}>
					<Typography className={classes.logo}>mcgill tools</Typography>
					<div className={classes.links}>
						{MENU_BUTTONS.map((arr) => (
							<Button
								className={classes.menuButton}
								key={arr[1]}
								onClick={() => setScrollIntoView(arr[1])}
							>
								{arr[0]}
							</Button>
						))}
					</div>
					<div>
						<Button
							color="primary"
							onClick={handleGetStarted}
							variant="outlined"
						>
							Sign In
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
}
