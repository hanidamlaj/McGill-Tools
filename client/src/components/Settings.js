// @flow

import type { User } from "./../reducers/types.js";

import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { CardHeader } from "@material-ui/core";
import CheckoutContainer from "../containers/CheckoutContainer.js";

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

type Props = {
	getUser: () => void,
	user: User,
	setSnackbar: (string) => void,
	setSnackbarError: (string) => void,
	updateUserProfile: (User) => Promise<void>,
};

// Extracts the extension and numbers from a possibly autofilled phone number.
function stripPhoneNumber(phoneNumber: string) {
	// set of ignored characters that may be present during browser autofill
	const ignoredCharacters = new Set(["(", " ", ")", "-"]);

	const filteredPhoneNumber = phoneNumber
		.split("")
		.filter((c) => !ignoredCharacters.has(c))
		.join("");

	return filteredPhoneNumber;
}

// Checks if a phone number is valid by our definition. i.e.: +1 followed by 10 digits.
function isPhoneNumberValid(phoneNumber: string) {
	const regex = /^\+1\d{10}$/;
	return regex.test(stripPhoneNumber(phoneNumber));
}

function Settings({
	getUser,
	setSnackbar,
	setSnackbarError,
	user,
	updateUserProfile,
}: Props) {
	const classes = useStyles();

	// State that controls form data containing user information.
	const [userDetails, setUserDetails] = useState<User>({
		...user,
		phoneNumber: user.phoneNumber || "+1",
	});

	const [openPayment, setOpenPayment] = useState<boolean>(false);

	// Fetch user data on mount.
	useEffect(() => {
		getUser();
	}, [getUser]);

	// Callback to handle changes to input.
	const handleChange = (name: string) => (event) => {
		setUserDetails({ ...userDetails, [name]: event.target.value });
	};

	// Callback function to reset the form to its initial/default value when user presses cancel.
	const onCancel = () => setUserDetails({ ...user });

	// Callback function to be invoked when user submits the form.
	const onSave = () => {
		// Phone numbers must be valid in order to send data to the server.
		// This is also validated on the server.
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
		<>
			<CheckoutContainer
				openPayment={openPayment}
				onClose={() => {
					setOpenPayment(false);
				}}
			/>
			<Grid container justifyContent="center">
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
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										disabled
										label="Remaining notifications"
										margin="normal"
										value={
											userDetails.numNotifications ?? 0
										}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										onClick={() => {
											setOpenPayment(true);
										}}
									>
										Add Funds
									</Button>
								</Grid>
							</Grid>
						</CardContent>
						<CardActions>
							<Grid container justifyContent="flex-end">
								<Button
									className={classes.button}
									onClick={onCancel}
								>
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
		</>
	);
}

export default Settings;
