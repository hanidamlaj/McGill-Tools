import { connect } from "react-redux";
import Unauthenticated from "../../components/logged_out/Unauthenticated";
import { login } from "../../actions/auth";

const mapDispatchToProps = dispatch => ({
	login(idToken) {
		dispatch(login(idToken));
	}
});

export default connect(
	null,
	mapDispatchToProps
)(Unauthenticated);
