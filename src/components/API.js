import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { CardHeader } from "@material-ui/core";

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
	}
}));

function API({ setSnackbar, setSnackbarError, user }) {
	const classes = useStyles();

	// state to control user input
	const [input, setInput] = useState({ name: "", purpose: "" });

	// onchange handler for text field inputs
	const handleChange = name => e => {
		setInput({ ...input, [name]: e.target.value });
	};

	// onclick handler for the cancel button
	const handleCancel = () => {
		setInput({ name: "", purpose: "" });
	};

	// onclick handler for the submit button
	const handleSubmit = () => {};

	return (
		<Card className={classes.root} elevation={0}>
			<CardHeader title="API Request Form" />
			<CardContent>
				<Grid container>
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							disabled
							label="Email"
							margin="normal"
							value={user.email}
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							label="Name"
							margin="normal"
							onChange={handleChange("name")}
							value={input.name}
							required
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							label="Purpose"
							margin="normal"
							multiline
							onChange={handleChange("purpose")}
							spellCheck
							rowsMax={5}
							value={input.purpose}
							required
						></TextField>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Grid container justify="flex-end">
					<Button className={classes.button} onClick={handleCancel}>
						cancel
					</Button>
					<Button
						className={classes.button}
						color="primary"
						onClick={handleSubmit}
						style={{ padding: "0px 32px" }}
						variant="outlined"
					>
						submit
					</Button>
				</Grid>
			</CardActions>
		</Card>
	);
}

export default API;
