import { connect } from "react-redux";

import NavigationMobile from "../components/navigation/NavigationMobile";

import { setLogout } from "../actions/auth";

const mapDispatchToProps = dispatch => ({
	logout() {
		dispatch(setLogout());
	}
});

export default connect(null, mapDispatchToProps)(NavigationMobile);
