import { connect } from "react-redux";
import Checkout from "../components/Checkout";
import { handleStripeCheckout } from "../actions/api";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
	handleStripeCheckout() {
		return dispatch(handleStripeCheckout());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
