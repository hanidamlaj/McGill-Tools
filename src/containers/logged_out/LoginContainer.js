import { connect } from "react-redux";
import Login from "../../components/logged_out/Login";
import { login } from "../../actions/auth";
import { removeLoaderKey } from "../../actions/loaders";

const mapDispatchToProps = dispatch => ({
	login(idToken) {
		dispatch(login(idToken));
	},
	removeLoaderKey(key) {
		dispatch(removeLoaderKey(key));
	}
});

export default connect(
	null,
	mapDispatchToProps
)(Login);
