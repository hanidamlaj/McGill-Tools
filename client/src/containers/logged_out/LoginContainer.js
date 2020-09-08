import { connect } from "react-redux";
import Login from "../../components/logged_out/Login";
import { login } from "../../actions/auth";
import { removeLoaderKey } from "../../actions/loaders";
import { setSnackbarError } from "../../actions/snackbar";

const mapDispatchToProps = dispatch => ({
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
	null,
	mapDispatchToProps
)(Login);
