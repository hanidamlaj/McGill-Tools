import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
	paypal_form: {
		marginTop: theme.spacing(2),
	},
	donateButton: {
		margin: "auto",
		display: "block",
	},
}));

function Donate() {
	const classes = useStyles();

	return (
		<Grid container justify="center">
			<Grid item xs={12} md={6}>
				<Card className={classes.root} elevation={0}>
					<CardHeader title="Donate" />
					<CardContent>
						<Grid container>
							<Grid item xs={12}>
								<Typography>
									Hello students! My name is Hani, I'm a
									recently graduated computer science student
									from McGill University. I started the
									McGill-Tools project to serve our community;
									the interest and support in the service
									surpassed all expectations. That said, the
									success of the application comes with
									considerable costs. In my pledge to keep the
									service free, your generosity would go a
									long way to ease the costs incurred. Any
									contributions would help me keep this
									project alive. Thanks!
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Link
									href="https://paypal.me/hanidamlaj?locale.x=en_US"
									target="_blank"
								>
									<input
										className={classes.donateButton}
										type="image"
										src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
										border="0"
										name="submit"
										title="PayPal - The safer, easier way to pay online!"
										alt="Donate with PayPal button"
									/>
								</Link>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default Donate;
