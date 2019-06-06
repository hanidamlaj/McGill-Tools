import { connect } from "react-redux";
import Home from "../components/home";

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(
	mapStateToProps,
	null
)(Home);
