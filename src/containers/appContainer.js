import { connect } from "react-redux";
import App from "../components/app";

const mapStateToProps = state => ({
	token: state.auth.token,
	loaders: state.loaders
});

export default connect(
	mapStateToProps,
	null
)(App);
