import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
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
									Hello students! My name is Hani, I'm a third year computer
									science student at McGill University. This year I started the
									McGill-Tools project to serve our community; the interest and
									support in the service surpassed all expectations. That said,
									the success of the application comes with considerable costs.
									In my pledge to keep the service free, your generosity would
									go a long way to ease the costs incurred. Any contributions
									would help me keep this project alive. Thanks!
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<form
									className={classes.paypal_form}
									action="https://www.paypal.com/cgi-bin/webscr"
									method="post"
									target="_top"
								>
									<input type="hidden" name="cmd" value="_donations" />
									<input type="hidden" name="business" value="L6E3J373XKBKL" />
									<input
										type="hidden"
										name="item_name"
										value="Keep the McGill-Tools service running!"
									/>
									<input type="hidden" name="currency_code" value="CAD" />
									<input
										className={classes.donateButton}
										type="image"
										src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
										border="0"
										name="submit"
										title="PayPal - The safer, easier way to pay online!"
										alt="Donate with PayPal button"
									/>
									<img
										alt=""
										border="0"
										src="https://www.paypal.com/en_CA/i/scr/pixel.gif"
										width="1"
										height="1"
									/>
								</form>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default Donate;
