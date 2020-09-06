// @flow

import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		width: 323,
		height: 70,
		border: "1px solid #c4c4c4",
		borderRadius: 50,
		padding: theme.spacing(0, 3),
		"& > span": {
			fontWeight: 500,
			fontSize: 18,
			justifyContent: "flex-start",
		},
		[theme.breakpoints.only("xs")]: {
			height: 48,
			padding: theme.spacing(0, 3),
			width: 269,
			"& > span": {
				fontWeight: 500,
				fontSize: 14,
				justifyContent: "flex-start",
			},
		},
	},
	providerImage: {
		height: 24,
		width: 24,
		marginRight: theme.spacing(1),
	},
	google: {
		"& > span": {
			color: "black",
		},
	},
	facebook: {
		backgroundColor: "#3C5A99",
		"&:hover": {
			backgroundColor: "rgba(60, 90, 153, 0.50)",
		},
		"& > span": {
			color: "white",
		},
	},
}));

type ContinueWithProviderProps = {
	handleClick: () => void,
};
/**
 * button to indicate that a user can continue with their Google account
 */
export function ContinueWithGoogle({ handleClick }: ContinueWithProviderProps) {
	const classes = useStyles();

	return (
		<Button
			className={`${classes.root} ${classes.google}`}
			onClick={handleClick}
		>
			<img
				alt=""
				className={classes.providerImage}
				src="/static/images/btn_google.svg"
			/>
			Continue With Google
		</Button>
	);
}

/**
 * @param {Function} handleClick callback function
 * button to indicate that a user can continue with their Facebook account
 */
export function ContinueWithFacebook({
	handleClick,
}: ContinueWithProviderProps) {
	const classes = useStyles();
	return (
		<Button
			className={`${classes.root} ${classes.facebook}`}
			onClick={handleClick}
		>
			<img
				alt=""
				className={classes.providerImage}
				src="/static/images/btn_facebook.png"
			/>
			Continue With Facebook
		</Button>
	);
}
