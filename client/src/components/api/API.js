// @flow

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
import AdminViewContainer from "../../containers/api/AdminAPIViewContainer";

import type { User } from "../../reducers/types.js";

const useStyles = makeStyles((theme) => ({
	root: {
		border: "2px solid #eeeeee",
	},
	textField: {
		maxWidth: 400,
		width: "100%",
	},
	button: {
		margin: theme.spacing(1),
	},
	alert: {
		padding: theme.spacing(1, 2),
		border: "1px solid transparent",
		width: "100%",
	},
	// alert css properties taken from bootstrap website
	alertSuccess: {
		color: "#155724",
		backgroundColor: "#d4edda",
		borderColor: "#c3e6cb",
	},
	alertDanger: {
		color: "#721c24",
		backgroundColor: "#f8d7da",
		borderColor: "#f5c6cb",
	},
	alertInfo: {
		color: "#0c5460",
		backgroundColor: "#d1ecf1",
		borderColor: "#bee5eb",
	},
}));

// Enum of application statuses
export type ApplicationStatus = "approved" | "pending" | "rejected" | "";

export type AccessTokenRequest = {
	// uid is inserted by the server before storing it in the DB.
	uid?: string,
	email: string,
	name: string,
	purpose: string,
	status: ApplicationStatus,
	// Present if status === "approved" (i.e. we have approved the request).
	accessToken?: string,
	// Present if status !== "" (i.e. an application has been submitted).
	// Date represents the date the request was created.
	date?: Date,
};

function APIView({
	createAccessTokenReq,
	fetchAccessTokenReqState,
	setSnackbar,
	user,
}: APIProps) {
	const classes = useStyles();

	// state to control user input / current state (e.g. rejected, pending, approved, or null) of the api-request
	const [apiReqState, setAPIReqState] = useState<AccessTokenRequest>({
		email: user.email,
		name: "",
		purpose: "",
		status: "",
	});

	// Boolean flag to determine if form has already been submitted by the user
	// and thus should disable user input/form.
	const hasAlreadySubmitted = apiReqState.status !== "";

	// On component mount, fetch the status of the api request
	// onpage load, fetch the status of the api request.
	useEffect(() => {
		fetchAccessTokenReqState().then((res) => {
			setAPIReqState(res);
		});
	}, [fetchAccessTokenReqState]);

	/**
	 * Maps enum ApplicationStatus {approved, rejected and pending} to feedback message.
	 */
	const statusMap: {
		[ApplicationStatus]: { className: string, message: string },
	} = {
		approved: {
			className: classes.alertSuccess,
			message:
				"Congratulations! Your application for an access token has been approved. Please\
                find your token and usage information below.",
		},
		rejected: {
			className: classes.alertDanger,
			message:
				"Unfortunately your application for an access token has been rejected.\
                For further discussion, please send me an email at hanidamlaj@gmail.com",
		},
		pending: {
			className: classes.alertInfo,
			message:
				"Thank you for your application. We are currently\
                in the process of reviewing your application. We hope to get back to you shortly.",
		},
	};

	// Callback function invoked when user changes on of the text/input fields.
	const handleChange = (name: string) => (
		e: SyntheticInputEvent<EventTarget>
	) => {
		const value = e.target.value;
		setAPIReqState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Callback function invoked when user clicks 'cancel'. We set the text fields
	// back to the default values.
	const handleCancel = () => {
		setAPIReqState((prevState) => ({
			email: user.email,
			name: "",
			purpose: "",
			status: "",
		}));
	};

	// Callback function invoked when the user clicks 'submit'.
	const handleSubmit = () => {
		createAccessTokenReq(apiReqState).then((res) => {
			if (!(res instanceof Error)) {
				setAPIReqState(res);
				setSnackbar("Request has been sent for review!");
			}
		});
	};

	/**
	 * copies the access token to the clipboard
	 */
	const handleCopy = () => {
		const accessTokenInputRef = document.getElementById("access_token");
		if (accessTokenInputRef) {
			// We know that this is an input element, so let's
			// disabled flow typechecker for this one line.
			// $FlowFixMe
			accessTokenInputRef.select();
			document.execCommand("copy");

			// Snackbar message to confirm clipboard copying.
			setSnackbar("Copied to clipboard!");
		}
	};

	return (
		<Card className={classes.root} elevation={0}>
			<CardHeader title="API Request Form" subheader="(beta)" />
			<CardContent>
				<Grid container>
					<Grid item xs={12}>
						{/* Banner for the status of the user's access token request/application */}
						{hasAlreadySubmitted && (
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

					{/* If the access token has been approved, display accessToken and API endpoints. */}
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
										),
									}}
								></TextField>
							</Grid>

							{/* API endpoints. */}
							<SwaggerView />
						</React.Fragment>
					)}

					{/* Disabled email text field with value `user.email`. */}
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							disabled
							label="Email"
							margin="normal"
							value={user.email}
						></TextField>
					</Grid>

					{/* Name of user placing the request. */}
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							disabled={hasAlreadySubmitted}
							label="Name"
							margin="normal"
							onChange={handleChange("name")}
							value={apiReqState.name}
							required
						></TextField>
					</Grid>

					{/* Reason for the access token. */}
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							disabled={hasAlreadySubmitted}
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

			{/* Actions (i.e. save & cancel) */}
			<CardActions>
				<Grid container justify="flex-end">
					<Button
						className={classes.button}
						disabled={hasAlreadySubmitted}
						onClick={handleCancel}
					>
						cancel
					</Button>
					<Button
						className={classes.button}
						color="primary"
						disabled={hasAlreadySubmitted}
						onClick={handleSubmit}
						style={{
							padding: "0px 32px",
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

type APIProps = {
	user: User,
	setSnackbar: (string) => void,
	createAccessTokenReq: (AccessTokenRequest) => Promise<AccessTokenRequest>,
	fetchAccessTokenReqState: () => Promise<AccessTokenRequest>,
};

export default function APIViewEntry(props: APIProps) {
	const { user } = props;
	return !!user.isAdmin ? <AdminViewContainer /> : <APIView {...props} />;
}
