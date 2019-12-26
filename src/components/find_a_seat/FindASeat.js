import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import CourseSubscriptionsContainer from "../../containers/find_a_seat/CourseSubscriptionsContainer";
import SubscribeToCourse from "./SubscribeToCourse";

/**
 * this component is the parent component for the get-a-seat page
 */
function FindASeat({ updateUserProfile, user }) {
	// state to control dialog
	const [open, setOpen] = useState(!user.phoneNumber);

	const [isNumberValid, setIsNumberValid] = useState(true);

	// extracts the extension and numbers from a possibly autofilled phone number
	function stripPhoneNumber(phoneNumber) {
		// set of ignored characters that may be present during browser autofill
		const ignoredCharacters = new Set(["(", " ", ")", "-"]);

		const filteredPhoneNumber = phoneNumber
			.split("")
			.filter(c => !ignoredCharacters.has(c))
			.join("");

		return filteredPhoneNumber;
	}

	// function to test for a valid north american number
	function isPhoneNumberValid(phoneNumber) {
		const regex = /^\+1\d{10}$/;
		return regex.test(stripPhoneNumber(phoneNumber));
	}

	// subscribe to changes in user profile
	useEffect(() => {
		// if the user has no phoneNumber, set the dialog to open
		// so user can configure their profile and phone number
		if (!user.phoneNumber) setOpen(true);
	}, [user]);

	// react state to control the data of the inputs
	const [userDetails, setUserDetails] = useState({
		...user,
		phoneNumber: user.phoneNumber || "+1"
	});

	// function to handle input changes
	const handleChange = name => event => {
		setUserDetails({ ...userDetails, [name]: event.target.value });
	};

	// function to be called when user has submitted form
	const handleSubmit = () => {
		if (!isPhoneNumberValid(userDetails.phoneNumber)) {
			setIsNumberValid(false);
		} else {
			updateUserProfile({
				...user,
				...userDetails,
				phoneNumber: stripPhoneNumber(userDetails.phoneNumber)
			}).then(res => {
				if (!(res instanceof Error)) {
					setOpen(false);
					setIsNumberValid(true);
				}
			});
		}
	};

	return (
		<React.Fragment>
			<Dialog open={open}>
				<DialogTitle>Profile</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to sections, please enter your phone number so we can
						notify you when seats become available.
					</DialogContentText>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								disabled
								fullWidth
								label="Email"
								margin="normal"
								value={userDetails.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Display name"
								margin="normal"
								onChange={handleChange("displayName")}
								value={userDetails.displayName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={!isNumberValid}
								fullWidth
								helperText="e.g. +15141234567"
								label="Phone number"
								margin="normal"
								onChange={handleChange("phoneNumber")}
								type="tel"
								value={userDetails.phoneNumber}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleSubmit}>
						Continue
					</Button>
				</DialogActions>
			</Dialog>
			<CourseSubscriptionsContainer />
			<SubscribeToCourse />
		</React.Fragment>
	);
}

export default FindASeat;
