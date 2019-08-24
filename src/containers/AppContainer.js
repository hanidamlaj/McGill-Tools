import { connect } from "react-redux";
import App from "../components/App";
import { setSnackbar } from "../actions/snackbar";

const mapStateToProps = state => ({
	token: state.auth.token,
	loaders: state.loaders,
	snackbar: state.snackbar
});

const mapDispatchToProps = dispatch => ({
	setSnackbar(message) {
		dispatch(setSnackbar(message));
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
