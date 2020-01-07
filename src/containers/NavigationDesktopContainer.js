import { connect } from "react-redux";

import NavigationDesktop from "../components/navigation/NavigationDesktop";
import { setLogout } from "../actions/auth";

const mapStateToProps = state => ({
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	logout() {
		dispatch(setLogout());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDesktop);
