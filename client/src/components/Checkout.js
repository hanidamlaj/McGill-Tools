import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

function StripeCheckout({ openPayment, handleStripeCheckout, onClose }) {
	return (
		<Dialog open={openPayment}>
			<DialogTitle>Notification Payment</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Thank you all for your support and for using this project
					&#60;3! Unfortunately, due to increased costs and demand, I
					am no longer able to maintain this service for free. I have
					set the price of $1 USD for five notifications.
				</DialogContentText>
				<DialogContentText>
					If you've just paid, please give the transaction a few
					minutes to settle. Please let me know if you run into any
					problems by emailing me at hanidamlaj@gmail.com. The payment
					is secured by Stripe checkout.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button type="submit" onClick={onClose}>
					Close
				</Button>
				<Button
					color="primary"
					type="submit"
					onClick={handleStripeCheckout}
				>
					Checkout
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default StripeCheckout;
