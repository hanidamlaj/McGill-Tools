import { connect } from "react-redux";
import Unauthenticated from "../../components/logged_out/Unauthenticated";
import { login } from "../../actions/auth";
import { addLoaderKey, removeLoaderKey } from "../../actions/loaders";
import { setSnackbarError } from "../../actions/snackbar";

const mapStateToProps = state => ({
	isLoading: state.loaders.length > 0
});

const mapDispatchToProps = dispatch => ({
	addLoaderKey(key) {
		dispatch(addLoaderKey(key));
	},
	login(idToken) {
		dispatch(login(idToken));
	},
	removeLoaderKey(key) {
		dispatch(removeLoaderKey(key));
	},
	setSnackbarError(message) {
		dispatch(setSnackbarError(message));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Unauthenticated);
