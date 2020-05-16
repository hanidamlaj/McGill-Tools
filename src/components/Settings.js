import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { CardHeader } from "@material-ui/core";

import firebase from "./../firebase";

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
}));

function Settings({
	getUser,
	setSnackbar,
	setSnackbarError,
	user,
	updateUserProfile,
}) {
	const classes = useStyles();

	// state that controls form data containing user information
	const [userDetails, setUserDetails] = useState({
		...user,
		phoneNumber: user.phoneNumber || "+1",
	});

	useEffect(() => {
		getUser();
	}, [getUser]);

	// extracts the extension and numbers from a possibly autofilled phone number
	function stripPhoneNumber(phoneNumber) {
		// set of ignored characters that may be present during browser autofill
		const ignoredCharacters = new Set(["(", " ", ")", "-"]);

		const filteredPhoneNumber = phoneNumber
			.split("")
			.filter((c) => !ignoredCharacters.has(c))
			.join("");

		return filteredPhoneNumber;
	}

	// checks if a phone number is valid after stripping away
	// ignored characters
	function isPhoneNumberValid(phoneNumber) {
		const regex = /^\+1\d{10}$/;
		return regex.test(stripPhoneNumber(phoneNumber));
	}

	// callback to handle changes to input
	const handleChange = (name) => (event) => {
		setUserDetails({ ...userDetails, [name]: event.target.value });
	};

	// resets form to its initial value when user presses cancel
	const onCancel = () => setUserDetails({ ...user });

	// function to be called when user submits form
	const onSave = () => {
		// phone numbers must be valid in order to send data to the server
		if (!isPhoneNumberValid(userDetails.phoneNumber)) {
			setSnackbarError("Incorrect phone number format.");
		} else {
			updateUserProfile({
				...user,
				...userDetails,
				phoneNumber: stripPhoneNumber(userDetails.phoneNumber),
			}).then((res) => {
				if (!(res instanceof Error))
					setSnackbar("User profile has been updated.");
			});
		}
	};

	return (
		<Grid container justify="center">
			<Grid item xs={12}>
				<Card className={classes.root} elevation={0}>
					<CardHeader title="Profile Settings"></CardHeader>
					<CardContent>
						<Grid container>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									disabled
									label="Email"
									margin="normal"
									value={userDetails.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									label="Display name"
									margin="normal"
									onChange={handleChange("displayName")}
									value={userDetails.displayName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									helperText="e.g. +15141234567"
									label="Phone number"
									margin="normal"
									onChange={handleChange("phoneNumber")}
									type="tel"
									value={userDetails.phoneNumber}
								/>
							</Grid>
						</Grid>
					</CardContent>
					<CardActions>
						<Grid container justify="flex-end">
							<Button className={classes.button} onClick={onCancel}>
								cancel
							</Button>
							<Button
								className={classes.button}
								color="primary"
								onClick={onSave}
								style={{ padding: "0px 32px" }}
								variant="outlined"
							>
								save
							</Button>
						</Grid>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
}

export default Settings;
