import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import {
	ContinueWithGoogle,
	ContinueWithFacebook
} from "./ContinueWithButtons";

const useStyles = makeStyles(theme => ({
	paper: {
		[theme.breakpoints.down("xs")]: {
			margin: theme.spacing(6, 1)
		}
	},
	dialogContent: {
		padding: theme.spacing(4, 4),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(4, 0)
		}
	},
	separator: {
		position: "relative",
		width: "100%",
		padding: theme.spacing(1, 0),
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
		<Dialog {...props} classes={{ paper: classes.paper }}>
			<DialogContent className={classes.dialogContent}>
				<Grid alignItems="center" container direction="column" justify="center">
					<ContinueWithFacebook handleClick={handleFacebookAuth} />
					<div className={classes.separator}>
						<p>
							<span>OR</span>
						</p>
					</div>
					<ContinueWithGoogle handleClick={handleGoogleAuth} />
				</Grid>
			</DialogContent>
		</Dialog>
	);
}

ContinueWithDialog.propTypes = {
	handleFacebookAuth: PropTypes.func.isRequired,
	handleGoogleAuth: PropTypes.func.isRequired
};
export default ContinueWithDialog;
