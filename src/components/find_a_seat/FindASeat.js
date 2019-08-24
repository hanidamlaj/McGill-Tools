import React, { useContext, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom/";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import CourseSubscriptionsContainer from "../../containers/find_a_seat/CourseSubscriptionsContainer";
import SubscribeToCourse from "./SubscribeToCourse";
import { IsSmallContext } from "../../shared";

const useStyles = makeStyles(theme => ({
	close: {
		color: "white",
		padding: theme.spacing(0.5)
	}
}));

function FindASeat({ user }) {
	const classes = useStyles();
	const isSmall = useContext(IsSmallContext);

	// state to control snackbar message
	const [open, setOpen] = useState(false);

	// callback to toggle the snackbar off
	const handleClose = (event, reason) => {
		if (reason === "clickaway") return;
		setOpen(false);
	};

	useEffect(() => {
		if (!user.phoneNumber) setOpen(true);
	}, []);

	return (
		<React.Fragment>
			{
				<Snackbar
					action={[
						<Link component={RouterLink} to="/settings" underline="none">
							<Button key="change" size="small" color="primary">
								settings
							</Button>
						</Link>,
						<IconButton
							className={classes.close}
							color="primary"
							key="close"
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					]}
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					message={
						<Typography variant="body2" style={{ fontWeight: 500 }}>
							You have not set-up your phone number.
						</Typography>
					}
					onClose={handleClose}
					open={open}
				/>
			}
			<Typography
				style={{ marginBottom: 32, textAlign: isSmall ? "center" : "left" }}
				variant={isSmall ? "h5" : "h3"}
			>
				FIND A SEAT
			</Typography>
			<CourseSubscriptionsContainer />
			<SubscribeToCourse />
		</React.Fragment>
	);
}

export default FindASeat;
