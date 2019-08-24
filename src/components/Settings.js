import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	root: {
		border: "2px solid #eeeeee",
		paddingLeft: theme.spacing(1)
	},
	sectionHeader: { fontWeight: 500, marginBottom: theme.spacing(2) },
	textField: {
		maxWidth: 400,
		width: "100%"
	},
	button: {
		margin: theme.spacing(1)
	}
}));

function isPhoneNumberValid(phoneNumber) {
	const regex = /^\+1\d{10}$/;
	return regex.test(phoneNumber);
}

function FindASeat({ setSnackbar, user, updateUserProfile }) {
	const classes = useStyles();

	const [userDetails, setUserDetails] = useState({
		displayName: user.displayName,
		phoneNumber: user.phoneNumber
	});

	const handleChange = name => event => {
		setUserDetails({ ...userDetails, [name]: event.target.value });
	};

	const onCancel = () => setUserDetails({ ...user });
	const onSave = () => {
		if (!isPhoneNumberValid(userDetails.phoneNumber)) {
			setSnackbar("Incorrect phone number format.");
		} else {
			updateUserProfile({ ...user, ...userDetails });
		}
	};

	return (
		<Grid container justify="center">
			<Grid item xs={12}>
				<Card className={classes.root} elevation={0}>
					<CardContent>
						<Typography className={classes.sectionHeader} variant="h5">
							Profile settings
						</Typography>
						<Grid container>
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

export default FindASeat;
