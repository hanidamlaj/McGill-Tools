import { connect } from "react-redux";
import App from "../components/App";
import { setSnackbar, setSnackbarError } from "../actions/snackbar";

const mapStateToProps = state => ({
	token: state.auth.token,
	loaders: state.loaders,
	snackbar: state.snackbar
});

const mapDispatchToProps = dispatch => ({
	setSnackbar(message) {
		dispatch(setSnackbar(message));
	},
	setSnackbarError(message) {
		dispatch(setSnackbarError(message));
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
