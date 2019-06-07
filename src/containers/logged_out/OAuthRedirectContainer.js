import { connect } from "react-redux";
import OAuthRedirect from "../../components/logged_out/OAuthRedirect";
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
)(OAuthRedirect);
