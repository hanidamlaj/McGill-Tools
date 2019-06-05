import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	dialog: {
		padding: theme.spacing(4, 4)
	},
	continueWithProvider: {
		display: "block",
		width: "80%",
		minWidth: 170
	},
	separator: {
		position: "relative",
		width: "100%",
		margin: theme.spacing(1, 0),
		"&::after": {
			display: "block",
			content: '""',
			borderBottom: "1px #e5e5e5 solid",
			position: "absolute",
			top: "50%",
			left: 0,
			right: 0,
			transform: "translateY(-50%)"
		},
		"& > p": {
			textAlign: "center",
			"& > span": {
				display: "inline-block",
				position: "relative",
				zIndex: 1,
				backgroundColor: "white",
				padding: theme.spacing(0, 4)
			}
		}
	}
}));

function ContinueWithDialog({
	handleGoogleAuth,
	handleFacebookAuth,
	...props
}) {
	const classes = useStyles();
	return (
		<Dialog {...props}>
			<DialogContent className={classes.dialog}>
				<Grid alignItems="center" container direction="column" justify="center">
					<img
						alt="Continue with Facebook"
						className={classes.continueWithProvider}
						onClick={handleFacebookAuth}
						src="/btn_facebook.svg"
					/>
					<div className={classes.separator}>
						<p>
							<span>OR</span>
						</p>
					</div>
					<img
						alt="Continue with Google"
						className={classes.continueWithProvider}
						onClick={handleGoogleAuth}
						src="/btn_google.svg"
					/>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}

export default ContinueWithDialog;
