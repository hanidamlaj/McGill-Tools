import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import FileCopy from "@material-ui/icons/FileCopy";

import classNames from "classnames";
import SwaggerView from "./SwaggerView";

const useStyles = makeStyles(theme => ({
	root: {
		border: "2px solid #eeeeee"
	},
	textField: {
		maxWidth: 400,
		width: "100%"
	},
	button: {
		margin: theme.spacing(1)
	},
	alert: {
		padding: theme.spacing(1, 2),
		border: "1px solid transparent",
		width: "100%"
	},
	// alert css properties taken from bootstrap website
	alertSuccess: {
		color: "#155724",
		backgroundColor: "#d4edda",
		borderColor: "#c3e6cb"
	},
	alertDanger: {
		color: "#721c24",
		backgroundColor: "#f8d7da",
		borderColor: "#f5c6cb"
	},
	alertInfo: {
		color: "#0c5460",
		backgroundColor: "#d1ecf1",
		borderColor: "#bee5eb"
	}
}));

function API({
	createAccessTokenReq,
	fetchAccessTokenReqState,
	setSnackbar,
	user
}) {
	const classes = useStyles();

	// state to control user input / current state (e.g. rejected, pending, approved, or null) of the api-request
	const [apiReqState, setAPIReqState] = useState({
		name: "",
		purpose: "",
		status: null
	});

	const statusMap = {
		approved: {
			className: classes.alertSuccess,
			message:
				"Congratulations! Your application for an access token has been approved. Please\
                find your token and usage information below."
		},
		rejected: {
			className: classes.alertDanger,
			message:
				"Unfortunately your application for an access token has been rejected.\
                For further discussion, please send me an email at hanidamlaj@gmail.com"
		},
		pending: {
			className: classes.alertInfo,
			message:
				"Thank you for your application. We are currently\
                in the process of reviewing your application. We hope to get back to you shortly."
		}
	};

	// onpage load, fetch the status of the api request
	useEffect(() => {
		fetchAccessTokenReqState().then(res => {
			if (!(res instanceof Error)) {
				setAPIReqState(res);
			}
		});
	}, []);

	// onchange handler for text field inputs
	const handleChange = name => e => {
		const value = e.target.value;
		setAPIReqState(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	// onclick handler for the cancel button
	const handleCancel = () => {
		setAPIReqState(prevState => ({
			...prevState,
			name: "",
			purpose: ""
		}));
	};

	// onclick handler for the submit button
	const handleSubmit = () => {
		createAccessTokenReq().then(res => {
			if (!(res instanceof Error)) {
				setAPIReqState(res);
			}
		});
	};

	/**
	 * copies the access token to the clipboard
	 */
	const handleCopy = () => {
		const accessTokenInputRef = document.getElementById("access_token");
		accessTokenInputRef.select();
		document.execCommand("copy");

		// set snackbar message to confirm copy
		setSnackbar("Copied to clipboard!");
	};

	return (
		<Card className={classes.root} elevation={0}>
			<CardHeader title="API Request Form" subheader="(beta)" />
			<CardContent>
				<Grid container>
					{/* alert for the status of the user's access token request/application */}
					<Grid item xs={12}>
						{!!apiReqState.status && (
							<Paper
								className={classNames(
									classes.alert,
									statusMap[apiReqState.status].className
								)}
								elevation={0}
							>
								<Typography align="center">
									{statusMap[apiReqState.status].message}
								</Typography>
							</Paper>
						)}
					</Grid>

					{/* if the access token has been approved, display accessToken and api endpoints */}
					{apiReqState.status === "approved" && (
						<React.Fragment>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									id="access_token"
									label="Access token"
									margin="normal"
									value={apiReqState.accessToken}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={handleCopy}>
													<FileCopy />
												</IconButton>
											</InputAdornment>
										)
									}}
								></TextField>
							</Grid>

							{/* api endpoints */}
							<SwaggerView />
						</React.Fragment>
					)}

					{/* email text field (disabled) */}
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							disabled
							label="Email"
							margin="normal"
							value={user.email}
						></TextField>
					</Grid>

					{/* the name of the user who would like access */}
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							disabled={!!apiReqState.status}
							label="Name"
							margin="normal"
							onChange={handleChange("name")}
							value={apiReqState.name}
							required
						></TextField>
					</Grid>

					{/* purpose of the access token */}
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							disabled={!!apiReqState.status}
							label="Purpose"
							margin="normal"
							multiline
							onChange={handleChange("purpose")}
							spellCheck
							rowsMax={5}
							value={apiReqState.purpose}
							required
						></TextField>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Grid container justify="flex-end">
					<Button
						className={classes.button}
						disabled={!!apiReqState.status}
						onClick={handleCancel}
					>
						cancel
					</Button>
					<Button
						className={classes.button}
						color="primary"
						disabled={!!apiReqState.status}
						onClick={handleSubmit}
						style={{
							padding: "0px 32px"
						}}
						variant="outlined"
					>
						request
					</Button>
				</Grid>
			</CardActions>
		</Card>
	);
}

// API.propTypes = {};

export default API;
